<template>
  <div class="flex flex-col gap-10 px-8">
    <div class="w-full flex justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-4xl font-bold text-white">{{ cocktail.cocktail_name }}</h1>

        <span
          v-tooltip.top="cocktail.cocktail_author"
          class="text-gray-400 truncate max-w-2xs"
        >
          {{ cocktail.cocktail_author }}
        </span>
      </div>

      <div
        v-show="cocktail.cocktail_taste?.length"
        class="flex gap-2 flex-wrap"
      >
        <Chip
          v-for="chip in mappedChips"
          :key="chip"
          :label="chip"
        />
      </div>
    </div>

    <div class="flex gap-10 items-start">
      <Fieldset
        class="h-auto flex-1 w-full max-w-1/3"
        legend="Ингредиенты"
      >
        <ul class="list-disc list-inside space-y-1">
          <li
            v-for="ingredient in cocktail?.cocktail_ingredients"
            :key="ingredient"
          >
            {{ ingredient }}
          </li>
        </ul>
      </Fieldset>

      <div class="flex flex-col gap-2 flex-1">
        <Timeline
          :value="instructionsArray"
          :pt="{
            eventopposite: 'hidden',
            event: 'flex-1!'
          }"
        >
          <template #content="slotProps">
            {{ slotProps.item }}
          </template>
        </Timeline>

        <p class="text-gray-300 text-sm">*Рекомендуется подавать в {{ cocktail?.cocktail_type_cap }}</p>
      </div>
    </div>

    <Fieldset
      :pt="{
        content: 'flex flex-col gap-2'
      }"
      legend="История"
    >
      <p class="m-0 text-gray-300">
        {{ cocktail?.cocktail_story }}
      </p>

      <p class="m-0 text-gray-300">
        {{ cocktail?.cocktail_note }}
      </p>
    </Fieldset>

    <div class="flex flex-col gap-2">
      <h2 class="text-lg">Похожие коктейли</h2>

      <div class="flex flex-wrap gap-2">
        <Button
          v-for="like in cocktail?.cocktail_like"
          :key="like"
          :href="`/?search=${like}`"
          :label="like"
          variant="text"
          raised
          as="a"
          rel="noopener"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chip from "primevue/chip"
import Fieldset from 'primevue/fieldset'
import Timeline from 'primevue/timeline'

import { defineProps } from 'vue'
import type { Cocktail } from "~/types/Cocktail"

const props = defineProps<{
  cocktail: Cocktail;
}>();

/**
 * Получение корректного массива вкусов коктейля
 * @param chips - массив вкусов коктейля
 * @returns {string[]}
 */
const mappedChips = computed(() => {
  if (Array.isArray(props.cocktail?.cocktail_taste)) {
    return props.cocktail.cocktail_taste.flat(Infinity)
  }
  return []
})

const instructionsArray: ComputedRef<string[] | undefined> = computed(() =>
  props.cocktail?.cocktail_build
    ?.split('\n')
    .map((step) => step.replace(/^\d+\.\s*/, ''))
    .filter((str) => str.trim() !== '')
)
</script>
