<template>
  <div class="w-full fixed h-screen flex gap-10 flex-col pb-10">
    <div
      v-if="isLoading"
      class="flex items-center justify-center fixed w-screen h-full bg-blue-100 opacity-15 left-0 top-0 z-10"
    >
      <ProgressSpinner v-show="isLoading"/>
    </div>

    <NuxtPage />
    <modals-container />

    <Toast @close="onCloseToast($event)"/>
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import Toast, { type ToastEvent } from 'primevue/toast'

import { ModalsContainer } from 'vue-final-modal'
import { useCocktailsStore } from '@/stores/cocktails'
import { useToast } from 'primevue/usetoast';
import { onMounted } from "vue";
import type { ToastServiceMethods } from "primevue";
import type { Message } from "~/types/Message";

const cocktailsStore: ReturnType<typeof useCocktailsStore> = useCocktailsStore()
const isLoading = computed(() => cocktailsStore.isLoading)

const notificationsStore = useNotificationStore()

const toast:ToastServiceMethods = useToast()

const onCloseToast = (event: ToastEvent) => {
  if (event.message?.id) {
    notificationsStore.markAsShown(Number(event.message?.id))
  }
}

const activeNotifications:ComputedRef = computed(() =>  notificationsStore.messages.filter(n => !n.shown))

// сделано специально, так как уведомления показываем только после монтирования приложения
onMounted(() => {
  watch(
    () => activeNotifications.value,
    (messages:Message[]) => {
      if (toast && messages.length) {
        messages.forEach(msg => {
          toast.add({
            severity: msg.severity,
            summary: msg.summary,
            detail: msg.detail,
            life: 3000,
            closable: true
          })
        })
      }
    },
    {
      immediate: true
    }
  )
})

</script>
