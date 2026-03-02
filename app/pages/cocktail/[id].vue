<template>
  <div class="flex flex-col gap-10 p-5">
    <Breadcrumb
      :home="home"
      :model="breadcrumbs"
      :pt="{
        root: 'bg-none'
      }"
    />

    <c-cocktail :cocktail="cocktail"/>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb'

import { useRoute } from 'vue-router'
import { useCocktailStore } from '~/stores/cocktail'

const route = useRoute()
const id = route.params?.id as string

const home = ref({
  icon: 'pi pi-home',
  url: '/'
})

const breadcrumbs = computed(() => [
  {
    label: cocktail.value?.cocktail_name,
    url: ''
  }
])

const cocktailStore = useCocktailStore()
const cocktail = computed(() => cocktailStore.cocktail || null)

cocktailStore.getCocktailData(id)
</script>
