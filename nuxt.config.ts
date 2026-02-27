// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['@/assets/css/global.css'],

  app: {
    head: {
      title: 'Aligned Apparel | High Vibe Drip. Wear Your Truth.',
      meta: [
        { name: 'description', content: 'For those bold enough to Talk it, Walk it & Wear it. Shop our curated collection of high vibe fashion.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://alignedapparel.co.za' },
        { property: 'og:title', content: 'Aligned Apparel | High Vibe Drip. Wear Your Truth.' },
        { property: 'og:description', content: 'For those bold enough to Talk it, Walk it & Wear it. Shop our curated collection of high vibe fashion.' },
        { property: 'og:image', content: 'https://alignedapparel.co.za/images/hero_optimized.webp' },
      ],
    },
  },

  devServer: {
    port: 4000,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/sitemap", // ✅ Sitemap module
  ],

  // @ts-ignore
  runtimeConfig: {
    public: {
      shopifyDomain: process.env.SHOPIFY_DOMAIN,
      shopifyToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
      SHOPIFY_STORE_URL: process.env.SHOPIFY_STORE_URL
    },
  },

  // @ts-ignore: googleFonts module options are not typed by default.
googleFonts: {
  display: "swap",
  preload: true,       // 👈 preload fonts early
  preconnect: true,    // 👈 establish early connections to fonts.googleapis.com
  families: {
    Raleway: true,
    Staatliches: true,
    "Clicker Script": true,
    Quintessential: true,
    "Moon Dance": true,
  },
},


  compatibilityDate: "2025-03-06",
});

