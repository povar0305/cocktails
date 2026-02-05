<template>
  <vue-final-modal
    :overlay-class="options.overlayClass"
    :class="options.class"
    :content-class="[options.contentClass, 'flex justify-end']"
    :overlay-transition="options.overlayTransition"
    :content-transition="options.contentTransition"
    :swipe-to-close="options.swipeToClose"
    :esc-to-close="true"
    @closed="$emit('update:model-value', false)"
  >
    <template #default>
      <div class="column-start w-full md:max-w-[320px] backdrop-blur-md p-6 flex gap-6 h-screen flex-col">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">
            Фильтры
          </h2>

          <Button
            variant="text"
            raised
            rel="noopener"
            @click="$emit('update:model-value', false)"
          >
            <template #icon>
              <span class="material-icons">close</span>
            </template>
          </Button>
        </div>

        <div class="flex flex-col gap-8">
          <template
            v-for="filter in mappedFilters"
            :key="filter.key"
          >
            <MultiSelect
              v-show="filter.element === filterTypes.multiSelect && filter.options?.length > 1"
              :model-value="selectedFilters[filter?.key] || []"
              display="chip"
              :options="filter.options"
              :filter="filter.options?.length > 5"
              :placeholder="filter.label"
              :max-selected-labels="3"
              append-to="self"
              @update:modelValue="onUpdateSelectedFilters({ key: filter?.key, value: $event })"
            />
          </template>
          {{mappedFilters}}
        </div>
      </div>
    </template>
  </vue-final-modal>
</template>

<script setup>
import { useModalOptions } from '~/compoable/modal.composable.js'
import { VueFinalModal } from 'vue-final-modal'
import { useCocktailsStore } from '~/stores/cocktail.js'
import {filterTypes} from '~/constants/filterTypes.js'

const cocktailsStore = useCocktailsStore()

const { options } = useModalOptions()

const filters = computed(() => cocktailsStore.filters || [] )
const filtersKey = [
  'cocktail_type',
  'cocktail_taste',
  'cocktail_author',
  'cocktail_type_drinks',
  'cocktail_complexity_type',
  'score'
]
const mappedFilters = computed(() => filters.value.filter(item => filtersKey.includes(item.key)))

const selectedFilters = computed(() => cocktailsStore.selectedFilters)
const onUpdateSelectedFilters = ({ key, value = null}) => {
  cocktailsStore.setSelectedFilters({ key, value })
}
</script>
