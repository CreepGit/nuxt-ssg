<template>
  <NuxtPage />
</template>

<style lang="scss">
// Global styles

:root {
    --golden-gradient: linear-gradient(55deg, yellow 0%, yellow 30%, lightyellow 60%, gold 62%, yellow 100%);
    --puprle-gradient: linear-gradient(55deg, rgb(136, 58, 234) 20%, rgb(203, 173, 244) 70%, lightgrey 73.5%, rgb(203, 173, 244) 80%);
    --nuxt-gradient: linear-gradient(55deg, rgb(58, 164, 96) 20%, rgb(173, 244, 203) 70%, lightgrey 73.5%, rgb(173, 244, 203) 80%);
}

html {
    font-family: system-ui, sans-serif;
    background: #13151a;
    scroll-behavior: smooth;
    color: white;
}

.fade-enter-active {
    transition: all 200ms;
}
.fade-leave-active {
    transition: all 50ms;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


main.astro-like {
    margin: auto;
    padding: 1rem;
    width: 800px;
    max-width: calc(100% - 2rem);
    color: white;
    font-size: 20px;
    line-height: 1.6;


    & header h1 {
        background: var(--golden-gradient);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: fit-content;
        color: transparent;
    }

    & code {
        box-sizing: border-box;
        border: 1px solid rgb(206, 157, 24);
        /* color: var(--code-col); */
        padding: 0.1rem 0.2rem;
        background: linear-gradient(55deg, yellow 0%, yellow 30%, lightyellow 60%, gold 62%, yellow 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        transition: background-position 500ms;
    }

    & pre {
        position: relative;
        font-size: 1rem;
        border: 1px solid rgb(206, 157, 24);
        overflow-x: auto;
        background: #0003;

        code {
            background: none;
            padding: 0;
            border: none;
            color: inherit;
        }
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & table th {
        background: var(--nuxt-gradient);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: fit-content;

        &:target {
            background-image: var(--golden-gradient);
        }
    }

    & a {
        text-decoration: dotted underline;
        color: white;
        transition: color 200ms;
    }

    & a:hover,
    & a:focus {
        color: gold;
    }

    & blockquote {
        border-left: 4px solid gold;
        padding-left: 1rem;
        margin: 0;
        background: rgba(255, 255, 255, 0.1);
    }

    /* region Scroll */
    & ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    & ::-webkit-scrollbar-track {
        background: transparent;
    }

    & ::-webkit-scrollbar-thumb {
        background: linear-gradient(55deg, yellow 10%, orange 90%);
        border-radius: 10px;
    }

    & ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* endregion Scroll */

    /* region Tables */
    & table {
        border-collapse: collapse;
    }

    & table th {
        white-space: nowrap;
        padding: 1px 0.5rem;
    }

    & .table-wrapper {
        overflow-x: scroll;
    }

    & table tr td {
        transition: background-color 70ms;
    }

    & table tr:hover td {
        background: rgba(255, 255, 255, 0.1);
    }

    /* endregion Tables */

    /* region Images */
    & img {
        max-width: 100%;
        height: auto;
    }

    /* endregion Images */
}
</style>