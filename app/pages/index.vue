<template>
  <div>
    {{ cocktailsStore.cocktails }}
  </div>
</template>

<script setup>
import { useCocktailsStore } from '~/stores/cocktail'

const cocktailsStore = useCocktailsStore()
console.log(cocktailsStore)

</script>
