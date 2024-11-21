// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/content', '@nuxt/fonts'],
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['astro', 'javascript', 'typescript', 'json', 'bash', 'shell', 'yaml', 'markdown', 'css', 'scss', 'html', 'vue']
    }
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  }
})
