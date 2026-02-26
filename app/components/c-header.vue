<template>
  <div class="flex w-full pt-6 px-3 container md:px-6 lg:px-8 2xl:px-10 lg:justify-between flex-col gap-3 lg:gap-10 lg:flex-row">
    <div class="flex gap-2 lg:gap-3 w-full justify-between lg:flex-row-reverse lg:w-full">
      <FloatLabel
        :pt="{
          root: {
            class: 'flex-1 flex lg:max-w-full'
          }
        }"
        variant="on"
      >
        <IconField>
          <InputText
            class="flex-1 w-full flex"
            type="text"
            :model-value="query"
            @update:model-value="$emit('update:query', $event.trim())"
            @keydown.enter="$emit('update:query', query)"
          />

          <InputIcon @click="$emit('update:query', null)">
            <span class="material-icons cursor-pointer w-4 h-4">close</span>
          </InputIcon>
        </IconField>

        <label>Cocktail name</label>
      </FloatLabel>

      <Button
        variant="text"
        raised
        as="a"
        rel="noopener"
        :href="`/cocktail/${ Math.floor(Math.random() * 101) }`"
      >
        <template #icon>
          <span class="material-icons">celebration</span>
        </template>
      </Button>
    </div>

    <div class="flex justify-between lg:gap-3 items-center">
      <p
        v-show="cocktails.length"
        class="text-base whitespace-nowrap"
      >
        Всего найдено  <span class="font-bold"> {{ cocktails.length }} </span>
      </p>

      <div
        v-show="primaryFilters.length"
        class="hidden lg:flex gap-2"
      >
        <MultiSelect
          v-for="filter in primaryFilters"
          :key="filter.key"
          v-show="filter.element === filterTypes.multiSelect"
          :model-value="selectedFilters[filter?.key] || []"
          display="chip"
          :options="filter.options"
          filter
          :placeholder="filter.label"
          :max-selected-labels="3"
          class="lg:w-60"
          @update:modelValue="onUpdateSelectedFilters({ key: filter?.key, value: $event })"
        />
      </div>

      <Button
        v-show="filters.length"
        class="lg:hidden"
        variant="text"
        raised
        rel="noopener"
        severity="secondary"
        @click="openFilterPopup"
      >
        <template #icon>
          <span class="material-icons">filter_alt</span>
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
import CFilters from '~/modals/c-filters.vue'

import { useCocktailsStore } from '~/stores/cocktail.js'
import { filterTypes } from '~/constants/filterTypes.js'
import { useModal } from 'vue-final-modal'

defineEmits(['update:query'])
const props = defineProps({
  query: {
    type: String,
    default: null,
    required: false
  }
})

const { query } = props

const cocktailsStore = useCocktailsStore()
const cocktails = computed(() => cocktailsStore.cocktails)

const filters = computed(() => cocktailsStore.filters || [] )
const primaryFiltersKey = ['cocktail_type', 'cocktail_taste']

const primaryFilters = computed(() => filters.value.filter(item => primaryFiltersKey.includes(item.key)))
const selectedFilters = computed(() => cocktailsStore.selectedFilters )
const onUpdateSelectedFilters = ({ key, value = null}) => {
  cocktailsStore.setSelectedFilters({ key, value })
}

const { open: openFilterPopup } = useModal({
  component: CFilters
})
</script>

