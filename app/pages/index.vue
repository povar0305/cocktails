<template>
  <div class="flex w-full h-auto">
    <div
      v-if="mappedCocktails.length && !isLoading"
      class="container md:tw-px-6 lg:tw-px-8 2xl:tw-px-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 2xl:grid-cols-4 items-stretch"
    >
      <c-card
        v-for="(cocktail, index) in mappedCocktails"
        :key="index"
        :cocktail="cocktail"
      />
    </div>

    <div
      v-else-if="!isLoading"
      class="flex flex-col gap-6 items-center text-center h-full w-full"
    >
      <h2 class="text-6xl font-bold leading-tight">
        {{ query ? 'Nothing found' : 'Enter the name of the cocktail' }}
      </h2>

      <div class="flex flex-col gap-2">
        <p class="text-base">
          {{ query || (mappedCocktails.length && hasSelectedFilters) ? "Unfortunately we couldn't find anything or update filters" : 'You can search by the full name of the cocktail or ingredient' }}
        </p>

        <p
          v-show="query|| (mappedCocktails.length && hasSelectedFilters)"
          class="text-base"
        >
          Try changing your request
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCocktailsStore } from '~/stores/cocktail'

const cocktailsStore = useCocktailsStore()

const cocktails = computed(() => cocktailsStore.filteredCocktails)
const filteredCocktails = computed(() => cocktailsStore.filteredCocktails)
const hasSelectedFilters = computed(() => cocktailsStore.hasSelectedFiltersValue)
const mappedCocktails = computed(()=> hasSelectedFilters.value ? filteredCocktails.value : cocktails.value)

const isLoading = computed(() => cocktailsStore.isLoading)
const query = computed(() => cocktailsStore.query)
</script>
