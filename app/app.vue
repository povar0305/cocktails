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
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'

import { ModalsContainer } from 'vue-final-modal'
import { useCocktailsStore } from '@/stores/cocktails'

const cocktailsStore: ReturnType<typeof useCocktailsStore> = useCocktailsStore()
const isLoading = computed(() => cocktailsStore.isLoading)
</script>
