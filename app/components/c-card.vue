<template>
  <Card>
    <template #title>
      <div class="flex justify-between w-full">
        <div class="flex items-center gap-2 w-80">
          {{ cocktail.cocktail_name }}

          <span
            v-tooltip.top="cocktail.cocktail_complexity_type"
            :class="[
              'material-symbols-outlined',
              iconByComplexity[cocktail?.cocktail_complexity_type]?.colorClass
            ]"
          >
            {{ iconByComplexity[cocktail?.cocktail_complexity_type]?.icon || 'question_mark' }}
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
    </template>

    <template #subtitle>
      <div
        v-show="cocktail?.cocktail_taste.length"
        class="flex gap-2 flex-wrap"
      >
        <Chip
          v-for="chip in mappedChips(cocktail?.cocktail_taste)"
          :key="chip"
          :label="chip"
        />
      </div>
    </template>

    <template #content>
      <Fieldset
        class="h-full"
        :legend="cocktail.cocktail_type"
      >
        <p class="m-0 text-base">
          {{ cocktail.cocktail_note }}
        </p>
      </Fieldset>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Fieldset from 'primevue/fieldset';

defineProps({
  cocktail: {
    type: String,
    default: null,
    required: false
  }
})

const iconByComplexity = {
  'легко': {
    icon: 'battery_android_0',
    colorClass: 'text-green-600'
  },
  'средне': {
    icon: 'battery_android_3',
    colorClass: 'text-orange-600'
  },
  'сложно': {
    icon: 'battery_android_full',
    colorClass: 'text-red-600'
  }
}

/**
 * Получение корректного массива вкусов коктейля
 * @param chips - массив вкусов коктейля
 * @returns {string[]}
 */
const mappedChips = (chips) => {
  if (Array.isArray(chips)) {
    return chips.flat(Infinity)
  }
  return []
}

const isFavorite = computed(() => false)
/**
 * Добавление коктейля в избранное
 * @param id
 */
const addToFavorite = (id) => {}
</script>
