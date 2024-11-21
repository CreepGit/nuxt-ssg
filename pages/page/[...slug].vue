<template>
    <div>
        <ContentDoc>
            <template v-slot="{ doc }">
                <main class="astro-like">
                    <header id="top">
                        <NuxtLink to="/" style="color: white;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                                class="back bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg>
                        </NuxtLink>
                        <h1>{{ doc.title||'TITLE NOT FOUND' }}</h1>
                        <p class="author">Made by {{doc.author||'Unknown Author'}}, {{doc.date||'Unknown Time'}}</p>
                    </header>
                    <ContentRenderer :value="doc" />
                </main>
            </template>
            <template #not-found>
                <main>
                    <h1>404</h1>
                    <p>Page not found</p>
                    <NuxtLink to="/">Go Back</NuxtLink>
                </main>
            </template>
            <template #empty>
                <main>
                    <h1>Empty</h1>
                    <p>Page is empty</p>
                    <NuxtLink to="/">Go Back</NuxtLink>
                </main>
            </template>
        </ContentDoc>
    </div>
</template>

<style lang="scss" scoped>
.author {
    opacity: 60%;
}

header>* {
    margin: 0;
}

header .back {
    border: 1px solid transparent;
}

header .back:hover {
    border-color: white;
    border-radius: 1rem;
}
</style>