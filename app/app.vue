<template>
  <div class="w-full fixed h-full flex gap-10 flex-col pb-10">
    <c-header
      :query="query"
      @update:query="onUpdateQuery"
    />

    <div
      v-if="isLoading"
      class="flex items-center justify-center fixed w-screen h-screen bg-blue-100 opacity-15 left-0 top-0 z-10"
    >
      <ProgressSpinner v-show="isLoading"/>
    </div>

    <NuxtPage />
  </div>
</template>

<script setup>
  import { useDebounceFn } from '@vueuse/core'

  import ProgressSpinner from 'primevue/progressspinner'
  import CHeader from './components/c-header.vue'

  const cocktailsStore = useCocktailsStore()
  const isLoading = computed(() => cocktailsStore.isLoading)

  const route = useRoute()
  if (route?.query?.search) {
    cocktailsStore.setQuery(route?.query?.search)
  }
  const query = ref(cocktailsStore.query || null)

  const debouncedGetCocktails = useDebounceFn(async () => {
    const cocktails = await cocktailsStore.getCocktailsByName() || []
    const cocktailsIng = await cocktailsStore.getCocktailsByIngredient() || []

    cocktailsStore.setCocktails([...cocktails, ...cocktailsIng])
  }, 500)
  /**
   * Обновление поискового запроса
   * @param {String|null} newValue - новое значение для поиска
   */
  const onUpdateQuery = (newValue = null) => {
    if (typeof newValue === 'string' || !newValue) {
      cocktailsStore.setQuery(newValue)

      if (!newValue) {
        cocktailsStore.setCocktails([])
      } else {
        debouncedGetCocktails()
      }
    }
  }
</script>
