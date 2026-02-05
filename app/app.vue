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
    <modals-container />
  </div>
</template>

<script setup>
  import { useDebounceFn } from '@vueuse/core'
  import { filterTypes } from '~/constants/filterTypes.js'

  import ProgressSpinner from 'primevue/progressspinner'
  import CHeader from './components/c-header.vue'
  import { ModalsContainer } from 'vue-final-modal'

  const cocktailsStore = useCocktailsStore()
  const isLoading = computed(() => cocktailsStore.isLoading)

  const route = useRoute()

  const query = ref(cocktailsStore.query || null)

  const debouncedGetCocktails = useDebounceFn(async () => {
    const cocktails = await cocktailsStore.getCocktailsByName() || []

    cocktailsStore.setCocktails(cocktails)

    const filters = [
      {
        label: 'Types',
        key: 'cocktail_type',
        element: filterTypes.multiSelect,
        options: cocktails.map((cocktail) => cocktail.cocktail_type)
      },
      {
        label: 'Taste',
        key: 'cocktail_taste',
        element: filterTypes.multiSelect,
        options: [...new Set(cocktails.flatMap(item => item.cocktail_taste).flat(Infinity))]
      }
    ]

    cocktailsStore.setFilters(filters)
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

  onMounted(async () => {
    if (route?.query?.search) {
      onUpdateQuery(route?.query?.search)
    }
  })

</script>
