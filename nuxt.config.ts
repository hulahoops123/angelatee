// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
export default defineNuxtConfig({
  devtools: { enabled: false },

  devServer: {
    port: 4000,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap', // ← add this line
  ],
  // @ts-ignore: googleFonts module options are not typed by default.
  googleFonts: {
    display: "swap",
    families: {
      'Raleway': true,
      'Staatliches': true,
      'Clicker Script': true,
      'Quintessential': true,
      'Moon Dance': true,
    }
  },
  // @ts-ignore: Nuxt does not type sitemap config by default
  sitemap: {
    siteUrl: 'https://faithfulfriendportraits.co.za',
  },

  compatibilityDate: '2025-03-06',
})