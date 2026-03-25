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
import { useCocktailsStore } from '~/stores/cocktails'
import { ref, computed } from 'vue'
import type { Cocktail } from "~/types/Cocktail";
import type { BreadcrumbItem } from "~/types/BreadCrumb";

// Получение текущего маршрута и его параметров
const route = useRoute()

// Предполагается, что маршрут содержит параметр id типа string
const id: string = route.params?.id as string

// Реф для "домашней" ссылки
const home = ref<{ icon: string; url: string }>({
  icon: 'pi pi-home',
  url: '/'
})

// Строка для названия коктейля (может быть undefined, пока не загрузится)
const cocktail:ComputedRef<Cocktail> = computed((): Cocktail => cocktailsStore.cocktail)

// Массив хлебных крошек
const breadcrumbs:ComputedRef<BreadcrumbItem[]> = computed(() => [
  {
    label: cocktail.value.cocktail_name,
    url: ''
  }
])

// Используем store коктейлей
const cocktailsStore: ReturnType<typeof useCocktailsStore> = useCocktailsStore()

// Вызовы API при загрузке компонента
if (id === 'random') {
  await cocktailsStore.getRandomCocktail()
} else {
  await cocktailsStore.getCocktailData(id)
}
</script>
