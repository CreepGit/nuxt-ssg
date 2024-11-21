<template>
    <div class="popToolsRoot">
		<h1>Try these handy <span class="text-gradient">Tools</span>!</h1>
        <div class="topTools">
            <form class="inputGroup" @submit.prevent="spawnTimer()" :class="{invalid: !newTimerIsValid}">
                <label class="toolName" for="newTimer">Spawn a new timer</label>
                <div class="inputPair">
                    <input type="text" id="newTimer" v-model="newTimerString" :placeholder="exampleTimerPreview" />
                    <input type="submit" value="Go">
                </div>
            </form>
        </div>
        <div class="toolInstances">
            <TransitionGroup name="spawn" @before-leave="beforeLeave">
                <div class="instance" v-for="timer in activeTimers" :key="timer.key" :class="{timerIsDone: timer.isDone, timerIsPaused: timer.isPaused&&!timer.isDone}">
                    <p class="timerText">{{ timeLeft(timer.key, forceRefreshKey) }}</p>
                    <div class="instanceActions">
                        <button v-if="timer.isBeeping" @click="timer.isBeeping = false">Stop Beep</button>
                        <template v-if="!timer.isDone">
                            <button @click="pauseTimer(timer.key)" v-if="!timer.isPaused">Pause</button>
                            <button @click="unpauseTimer(timer.key)" v-if="timer.isPaused">Resume</button>
                        </template>
                        <button @click="removeTimer(timer.key)">Remove</button>
                    </div>
                    <div class="beepCover" @click="timer.isBeeping=false" v-if="timer.isBeeping">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
                        </svg>
                        <span class="beepInstruction">Click to dismiss</span>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type TimerInstance = {
    key: string,
    untilTimestamp: number,
    isDone: boolean,
    isPaused: boolean,
    pausedMSRemaining?: number,
    isBeeping?: boolean,
}

const newTimerString = ref<string>('')
const newTimerIsValid = computed(() => {
    if (newTimerString.value == '') return true
    const {valid} = formatTime()
    return valid
})
const activeTimers = ref<TimerInstance[]>([])

function formatTime() {
    // must match
    // 10s
    // 10seconds
    // 10sec
    // 10min 10s
    // 1h10m20s
    const badFormatOutput = {
        valid: false,
        hours: 0,
        minutes: 0,
        seconds: 0,
        timeString: "0:0:0",
        totalSeconds: 0,
    }
    const m = newTimerString.value.match(/(\d+\s?(hours|hour|h))?\s?(\d+\s?(minutes|mins|minute|min|m))?\s?(\d+\s?(s|sec|secs|second|seconds))?/)
    if (!m) return badFormatOutput;
    if (!m[0]) return badFormatOutput;
    let h_count = parseInt(m[1]) || 0
    let m_count = parseInt(m[3]) || 0
    let s_count = parseInt(m[5]) || 0

    const extraMinutes = Math.floor(s_count / 60)
    m_count += extraMinutes
    s_count -= extraMinutes * 60
    const extraHours = Math.floor(m_count / 60)
    h_count += extraHours
    m_count -= extraHours * 60

    let totalSeconds = h_count * 3600 + m_count * 60 + s_count

    return {
        valid: true,
        hours: h_count,
        minutes: m_count,
        seconds: s_count,
        timeString: `${h_count}:${m_count}:${s_count}`,
        totalSeconds: totalSeconds,
    }
}

function syncTimersToLocalStorage() {
    localStorage.setItem('activeTimers', JSON.stringify(activeTimers.value))
}

function spawnTimer() {
    const time = formatTime()
    if (!time.valid) return
    const addTime = 500 // Add half a second for nicer looking starting value
    newTimerString.value = ''
    const timer = {
        key: Math.random().toString(36).substring(7),
        untilTimestamp: Date.now() + time.totalSeconds * 1000 + addTime,
        isDone: false,
        isPaused: false,
    }
    activeTimers.value.unshift(timer)
    syncTimersToLocalStorage()
}

function timeLeft(key: string, _forceRefreshKey: any) {
    const timer = activeTimers.value.find(t => t.key == key)
    if (!timer) return 'missing timer'
    if (timer.isDone) return '00:00:00'
    let timeLeft;
    if (timer.isPaused) {
        timeLeft = timer.pausedMSRemaining!
    } else {
        timeLeft = timer.untilTimestamp - Date.now()
    }
    if (timeLeft < 0) {
        timer.isDone = true
        timer.isBeeping = true
        return '00:00:00'
    }
    const hours = Math.floor(timeLeft / 3600000).toString().padStart(2, "0")
    const minutes = Math.floor((timeLeft % 3600000) / 60000).toString().padStart(2, "0")
    const seconds = Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
}

function pauseTimer(key: string) {
    const timer = activeTimers.value.find(t => t.key == key)
    if (!timer) return
    timer.isPaused = true
    timer.pausedMSRemaining = timer.untilTimestamp - Date.now()
    syncTimersToLocalStorage()
}

function unpauseTimer(key: string) {
    const timer = activeTimers.value.find(t => t.key == key)
    if (!timer) return
    timer.isPaused = false
    timer.untilTimestamp = Date.now() + timer.pausedMSRemaining!
    syncTimersToLocalStorage()
}

function removeTimer(key: string) {
    activeTimers.value = activeTimers.value.filter(t => t.key != key)
    syncTimersToLocalStorage()
}

let timeRenderInterval: NodeJS.Timeout
const forceRefreshKey = ref<number>(0)
onMounted(()=>{
    timeRenderInterval = setInterval(()=>{
        forceRefreshKey.value++
    }, 1000)
    const storedTimers = localStorage.getItem('activeTimers')
    if (storedTimers) {
        activeTimers.value = JSON.parse(storedTimers)
    }
})
onUnmounted(()=>{
    clearInterval(timeRenderInterval)
})

// Example timers
import Typewriter from 'typewriter-effect/dist/core';

const exampleTimerPreview = ref<string>('')
function intBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const exampleTimers = [
    () => `${intBetween(1, 10)}m`,
    () => `${intBetween(1, 30)}m ${intBetween(1,5) * 10}s`,
    () => `${intBetween(1, 48)}h ${intBetween(1,11) * 5}m`,
    () => `${intBetween(1, 3)}h ${intBetween(1, 30)}m ${intBetween(1,5) * 10}s`,
    () => `${intBetween(1, 10)} minutes`,
    () => `${intBetween(1, 30)} min ${intBetween(1,5) * 10} sec`,
    () => `${intBetween(110, 999)}min`,
    () => `${intBetween(1, 24)}h`,
    () => `${intBetween(10, 120)} minutes`,
    () => `${intBetween(1, 15)}h ${intBetween(1, 45)}m`,
    () => `${intBetween(1, 60)}m ${intBetween(1, 59)}s`,
    () => `${intBetween(2, 10)}h ${intBetween(1,30)} min`,
    () => `${intBetween(30, 600)} seconds`,
    () => `${intBetween(50, 500)}min`,
    () => `${intBetween(1, 6)}h ${intBetween(10, 50)}m ${intBetween(5, 55)}s`,
    () => `${intBetween(100, 999)} mins`,
    () => `${intBetween(1, 12)}h ${intBetween(1, 59)}m ${intBetween(1, 59)}s`,
    () => `${intBetween(15, 90)} mins`,
    () => `${intBetween(1, 48)} hours`,
    () => `${intBetween(1, 24)}h ${intBetween(1, 60)}m`,
    () => `${intBetween(1, 10)} hours`,
    () => `${intBetween(1000, 80000)} seconds`,
    () => `${intBetween(1, 4)}h ${intBetween(15, 45)}min`,
    () => `${intBetween(1, 20)}m ${intBetween(10, 40)}s`,
    () => `${intBetween(1, 59)}m ${intBetween(1,59)} seconds`,
    () => `${intBetween(1, 72)} hours`,
    () => `${intBetween(1, 1000)} mins`,
    () => `${intBetween(10, 999)} seconds`,
    () => `${intBetween(1, 5)}h ${intBetween(1,30)}m ${intBetween(1,20) * 3}s`,
]
function selectRandomExampleTimer() {
    const randomTimer = exampleTimers[intBetween(0, exampleTimers.length - 1)]()
    return randomTimer
}
onMounted(()=>{
    const randomTimerStrings = Array.from({length: 15}, selectRandomExampleTimer)
    new Typewriter(null, {
        strings: randomTimerStrings,
        autoStart: true,
        loop: true,
        pauseFor: 3000,
        onCreateTextNode: (character: string) => {
            exampleTimerPreview.value += character
        },
        onRemoveNode: (character: string) => {
            exampleTimerPreview.value = exampleTimerPreview.value.slice(0, -1)
        }
    })
})
// Sound stuff
import * as Tone from "tone";
let synth: Tone.Synth|undefined;
const beepTimeBetweenNotes = 0.30
const beepTimeBetweenSets = 1.00
const isBeeping = computed(()=>{
    for (const timer of activeTimers.value) {
        if (timer.isBeeping) return true
    }
    return false
})
async function beeps() {
    if (!synth) return
    Tone.start()
    const now = Tone.now()
    synth.triggerAttackRelease("E4", "16n", now + 0*beepTimeBetweenNotes)
    synth.triggerAttackRelease("E4", "16n", now + 1*beepTimeBetweenNotes)
    synth.triggerAttackRelease("E4", "16n", now + 2*beepTimeBetweenNotes)
    synth.triggerAttackRelease("E4", "16n", now + 3*beepTimeBetweenNotes)
}
let beepInterval: NodeJS.Timeout
onMounted(()=>{
    synth = new Tone.Synth().toDestination()
    beepInterval = setInterval(()=>{
        if (isBeeping.value) {
            beeps()
        }
    }, beepTimeBetweenSets * 1000 + beepTimeBetweenNotes * 4 * 1000)
})
onUnmounted(()=>{
    synth?.dispose()
    clearInterval(beepInterval)
})

// Vue Transition
function beforeLeave(el: any) {
    const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)

    el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`
    el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`
    el.style.width = width
    el.style.height = height
}
</script>

<style scoped>
.popToolsRoot {
    --accent: 136, 58, 234;
    --accent-light: 224, 204, 250;
    --accent-dark: 49, 10, 101;
    --danger-light: 255, 204, 204;
    --danger-dark: 153, 0, 0;
    --accent-gradient: linear-gradient(
        45deg,
        rgb(var(--accent)),
        rgb(var(--accent-light)) 30%,
        white 60%
    );
}
.toolInstances {
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
}
.instance {
    position: relative;
    border: 1px solid rgba(var(--accent-light), 35%);
    /* background: linear-gradient(90deg, rgb(var(--accent-dark)) 10%, rgba(var(--accent-light), 30%) 80%, rgba(var(--accent-light), 40%), rgb(var(--danger-dark))); */
    background: linear-gradient(35deg,
        rgba(var(--accent-dark), 66%) 4%,
        rgba(var(--accent-light), 20%) 30%,
        rgba(var(--accent-dark), 66%) 70%,
        rgba(var(--danger-dark), 20%) 100%
    );
    background-size: 400%;
    background-position: 0%;
    transition: background-position 800ms;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.instance>* {
    margin: 0;
}
.instanceActions {
    display: flex;
    justify-content: space-around;
}
.instanceActions button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background: rgba(var(--accent-light), 50%);
    color: white;
    cursor: pointer;
}
.text-gradient {
    background-image: var(--golden-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.inputGroup {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 20ch;
    padding: 0.5rem;
}
.inputGroup input {
    transition: background-color 200ms;
}
.inputGroup:focus-within {
    outline: auto;
}
.inputGroup>* {
    width: 100%;
}
.inputGroup input:disabled {
    border: 2px solid red;
    background-color: rgba(#fff, 50%);
}
.inputPair {
    display: grid;
    grid-template-columns: 1fr auto;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(var(--accent-light), 35%);
}
.inputPair>* {
    width: 100%;
    border: none;
    outline: none;
    background-color: rgba(var(--accent-dark), 20%);
    color: white;
    padding: 6px;
}
.inputGroup input[type="submit"]:hover {
    background-color: rgba(var(--accent-light), 50%);
}
.inputGroup input[type="submit"]:focus {
    background-color: rgba(var(--accent-light), 50%);
} 
.toolName {
    grid-column: span 2;
    font-size: medium;
    text-align: center;
}
.invalid {
    border-color: red;
}
.invalid .toolName {
    color: orangered;
}
.timerText {
    text-align: center;
    transition: background-position 2000ms;
    background: linear-gradient(35deg, orangered 0%, orange 30%, #aa0 60%, #f3f 80%, #fef 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400%;
    background-position: 100%;
}
.timerIsDone .timerText {
    background-position: 0%;
}
.instance.timerIsDone {
    background-position: 100%;
}
.instance.timerIsPaused {
    background-position: 50%;
}
.instance.timerIsPaused .timerText {
    background-position: 50%;
}
.beepCover {
    position: absolute;
    inset: 0;
    background: #0009;
    backdrop-filter: blur(2px);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
}
.beepCover svg {
    width: 50px;
    height: 50px;
}
.beepInstruction {
    position: absolute;
    display: flex;
    background: #000;
    padding: 3px 9px;
    z-index: 100;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 200ms;
}
.beepCover:hover .beepInstruction {
    opacity: 1;
}
/* Vue Transition */
.spawn-move,
.spawn-enter-active,
.spawn-leave-active {
    transition: transform 600ms, translate 600ms, opacity 600ms;
    pointer-events: none;
}
.spawn-enter-from {
    opacity: 0;
    translate: -50% 0;
}
.spawn-leave-to {
    opacity: 0;
    translate: 0 25%;
}
.spawn-leave-active {
    position: absolute;
    border-color: #f00;
    z-index: 100;
}
</style>
