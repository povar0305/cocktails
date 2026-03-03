import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import type { App } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Типизация vueApp как App
  const app: App = nuxtApp.vueApp

  // Используем PrimeVue
  app.use(PrimeVue)

  // Регистрация глобальной директивы
  app.directive('tooltip', Tooltip)
})
