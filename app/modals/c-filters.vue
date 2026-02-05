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
              v-if="filter.element === filterTypes.multiSelect && filter.options?.length > 1"
              :model-value="selectedFilters[filter?.key] || []"
              display="chip"
              :options="filter.options"
              :filter="filter.options?.length > 5"
              :placeholder="filter.label"
              :max-selected-labels="3"
              append-to="self"
              @update:modelValue="onUpdateSelectedFilters({ key: filter?.key, value: $event})"
            />

            <div
              v-else-if="filter.element === filterTypes.range || filter.element === filterTypes.rangeText"
              class="flex flex-col gap-3"
            >
              <span class="text-lg tetx-white">
                {{ filter.label }} - {{ getSelectedFilterValueRange(filter)}}
              </span>

              <div class="flex flex-col gap-2">
                <div
                  v-if="filter.element === filterTypes.rangeText"
                  class="flex justify-between"
                >
                  <span
                    v-for="option in Array.from({ length: filter.options.length }, (_, i) => i + 1)"
                    :key="option"
                    class="text-white/60"
                  >
                    {{ option }}
                  </span>
                </div>

                <Slider
                  :model-value="selectedFilters[filter?.key] || 0"
                  :max="filterTypes.range ? filter.options[filter.options.length - 1] : filter.options.length"
                  :min="0"
                  :range="filter.range || false"
                  :step="1"
                  @update:model-value="onUpdateSelectedFilters({ key: filter?.key, value: $event, type: filter.element, options: filter.options })"
                />

                <div
                  v-if="filter.element === filterTypes.range"
                  class="flex justify-between"
                >
                  <span
                    v-for="option in [filter.options[0], filter.options[filter.options.length - 1]]"
                    :key="option"
                    class="text-white/60"
                  >
                    {{ option }}
                  </span>
                </div>

                <pre>
                                  {{selectedFilters}}

                </pre>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </vue-final-modal>
</template>

<script setup>
import { useModalOptions } from '~/compoable/modal.composable.js'
import { VueFinalModal } from 'vue-final-modal'
import { useCocktailsStore } from '~/stores/cocktail.js'
import { filterTypes } from '~/constants/filterTypes.js'

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
const onUpdateSelectedFilters = ({ key, value = null, type= null, options = [] }) => {
  console.log('value',value)
  if (type === filterTypes.rangeText) {
    // console.log(options, { key, value: options[value] }, value)
    cocktailsStore.setSelectedFilters({ key, value: options[value] })
  } else {
    cocktailsStore.setSelectedFilters({ key, value})
  }
}

const getSelectedFilterValueRange = (filter) => {
    return (filter.element === filterTypes.range ? selectedFilters.value[filter.key] : filter.options[selectedFilters.value[filter.key]] )|| 0
}
</script>
