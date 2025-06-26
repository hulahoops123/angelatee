// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['@/assets/css/global.css'],

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

