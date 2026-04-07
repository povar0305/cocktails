
import tailwindcss from "@tailwindcss/vite";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";


const preset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          0: '#ffffff',
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
        },
        surface: {
          0: '#ffffff',
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
      },
      dark: {
        primary: {
          0: '#ffffff',
          50: '{pink.50}',
          100: '{pink.100}',
          200: '{pink.200}',
          300: '{pink.300}',
          400: '{pink.400}',
          500: '{pink.500}',
          600: '{pink.600}',
          700: '{pink.700}',
          800: '{pink.800}',
          900: '{pink.900}',
          950: '{pink.950}'
        },
        surface: {
          0: '#ffffff',
          50: '{pink.50}',
          100: '{pink.100}',
          200: '{pink.200}',
          300: '{pink.300}',
          400: '{pink.400}',
          500: '{pink.500}',
          600: '{pink.600}',
          700: '{pink.700}',
          800: '{pink.800}',
          900: '{pink.900}',
          950: '{pink.950}'
        }
      }
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
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Google+Sans'
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  css: [
    './app/assets/styles/main.css',
    'vue-final-modal/style.css',
  ],
  devtools: { enabled: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@vue-final-modal/nuxt',
    '@pinia/nuxt'
  ],
  primevue: {
    options: {
      theme: {
        preset: preset,
        options: {
          darkModeSelector: '.app-dark',
        }
      }
    }
  },
  plugins: [
    '~/plugins/primevue.ts'
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
      tailwindcss()
    ]
  }
})
