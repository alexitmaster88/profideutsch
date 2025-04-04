import svgLoader from "vite-svg-loader";
import { API_URL } from "./services/base";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    experimental: {
      websocket: true,
    }
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  routeRules: {
    '/appeal/**': { ssr: false },
    '/uz/appeal/**': { ssr: false },
    '/ru/appeal/**': { ssr: false },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  plugins: [
    // '~/plugins/aos.client.ts',
    '~/plugins/vue-toastificaton.client.ts',
    '~/plugins/vue-awesome-paginate.js',

  ],
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/motion/nuxt', "@nuxt/image"],
  i18n: {
    lazy: true,
    langDir: 'i18n/locales',
    defaultLocale: 'uz',
    locales: [
      {
        id: 1,
        code: 'uz',
        file: 'uz.json',
        iso: 'uz-uz',
        label: "O'zbekcha",
      },
      {
        id: 2,
        label: "Русский",
        code: 'ru',
        iso: 'ru-ru',
        file: 'ru.json'
      },
      {
        id: 3,
        label: "English",
        code: 'en',
        iso: 'en-us',
        file: 'en.json'
      }
    ],
    compilation: {
      strictMessage: false,
    },
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'locale',
    //   fallbackLocale: 'uz',
    // },
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    vueI18n: '~/i18n/i18n.config.ts' // if you are using custom path, default
  },
  css: ['~/styles/index.css'],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    port: 8082,
    host: 'localhost'
  },
  vite: {
    plugins: [
      svgLoader(
        {
          defaultImport: 'url' // or 'raw'
        }
      )
    ],
    build: {
      modulePreload: false
    }
  },
  image: {
    strapi: {
      baseURL: API_URL
    }
  }
})