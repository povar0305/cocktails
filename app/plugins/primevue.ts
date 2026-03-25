import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice';

import type { App } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Типизация vueApp как App
  const app: App = nuxtApp.vueApp

  app.use(PrimeVue)
  app.use(ToastService)
  app.directive('tooltip', Tooltip)
})
