// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import { definePreset } from "@primeuix/themes";
import tailwindcss from "@tailwindcss/vite";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}',
      950: '{purple.950}'
    }
  }
});

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Google+Sans'
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
      theme: {
        preset: MyPreset
      }
    }
  },
  css: [
    './app/assets/styles/main.css'
  ],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://apmix.ru',
          changeOrigin: true
        }
      }
    },
    plugins: [
      tailwindcss(),
    ]
  }
})
