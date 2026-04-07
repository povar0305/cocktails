<template>
  <Card>
    <template #title>
      <div
        v-if="!loading"
        class="flex justify-between w-full"
      >
        <div class="flex items-center gap-2 w-80">
          <nuxt-link :to="`cocktail/${cocktail.id}`">
            {{ cocktail.cocktail_name }}
          </nuxt-link>

          <span
            v-tooltip.top="cocktail.cocktail_complexity_type"
            :class="[
              'material-symbols-outlined',
              iconByComplexity[cocktail.cocktail_complexity_type]?.colorClass
            ]"
          >
            {{ iconByComplexity[cocktail.cocktail_complexity_type]?.icon || 'question_mark' }}
          </span>
        </div>

        <Button
          variant="text"
          @click="addToFavorite(cocktail.id)"
        >
          <template #icon>
            <span
              v-if="isFavorite"
              class="material-icons"
            >
              favorite
            </span>

            <span
              v-else
              class="material-symbols-outlined"
            >
              favorite
            </span>
          </template>
        </Button>
      </div>

      <Skeleton v-else />
    </template>

    <template #subtitle>
      <div
        v-if="cocktail?.cocktail_taste?.length && !loading"
        class="flex gap-2 flex-wrap"
      >
        <Chip
          v-for="chip in mappedChips(cocktail?.cocktail_taste)"
          :key="chip"
          :label="chip"
        />
      </div>

      <Skeleton
        v-else
        height="2rem"
      />
    </template>

    <template #content>
      <Fieldset
        v-if="cocktail?.cocktail_type && !loading"
        class="h-full"
        :legend="cocktail?.cocktail_type"
      >
        <p class="m-0 text-base">
          {{ cocktail?.cocktail_note }}
        </p>
      </Fieldset>

      <Skeleton
        v-else
        height="4rem"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Fieldset from 'primevue/fieldset'
import Skeleton from 'primevue/skeleton'

import type { Cocktail } from "~/types/Cocktail"

defineProps({
  cocktail: {
    type: Object as PropType<Cocktail>,
    required: true
  },
  loading: {
    type: Boolean,
    default: true
  }
})

const iconByComplexity: Record<'легко' | 'средне' | 'сложно', { icon: string; colorClass: string }> = {
  легко: {
    icon: 'battery_android_0'
  },
  средне: {
    icon: 'battery_android_3'
  },
  сложно: {
    icon: 'battery_android_full'
  }
}
/**
 * Получение корректного массива вкусов коктейля
 * @param chips - массив вкусов коктейля
 * @returns {string[]}
 */
const mappedChips = (chips: string[] | undefined): string[] => {
  if (Array.isArray(chips)) {
    return chips.flat(Infinity)
  }
  return []
}

const isFavorite:ComputedRef<boolean> = computed(() => false)
/**
 * Добавление коктейля в избранное
 * @param id
 */
const addToFavorite = (id: string) => {
  console.debug(id)
}
</script>
