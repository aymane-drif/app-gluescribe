import { fileURLToPath } from "url";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// PWA Config
const title = "Gluescribe - Transcribe with Ease and Accuracy";
const shortTitle = "Gluescribe - Transcription App for Researchers";
const description =
  "Gluescribe - Empowering researchers with advanced transcription solutions for all types of studies";
const image = "";
const url = "";
const themeColor = "#f1f5f9";

export default defineNuxtConfig({
  ssr: false,
  alias: {
    "@configured-variables": fileURLToPath(
      new URL("./assets/styles/_variables.scss", import.meta.url)
    ),
  },

  app: {
    baseURL: "/",
    head: {
      title: title,
      titleTemplate: "%s - Transcribe with Ease and Accuracy",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        { charset: "utf-8" },
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },

        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },

  build: { transpile: ["vuetify"] },

  compatibilityDate: "2025-03-08",

  css: [
    "/assets/styles/_index.scss",
    "/assets/styles/plugin/vue-code-highlighter.css",
    "dropzone-vue/dist/drop-zone.common.css",
    "apexcharts/dist/apexcharts.css",
  ],

  components: [
    {
      path: "~/components/globals",
      prefix: "Globals",
    },
  ],

  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(
          vuetify({
            styles: {
              configFile: "/assets/styles/vuetify/_setting.scss",
            },
          })
        );
      });
    },
  ],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      description: description,
      theme_color: themeColor,
      lang: "en",
      background_color: "#ffffff",
      icons: [
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});