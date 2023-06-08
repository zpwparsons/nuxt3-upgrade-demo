// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      BASE_URL: process.env.BASE_URL
    }
  },

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  imports: {
    dirs: ['./utils'],
  },
})
