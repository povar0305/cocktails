<template>
  <div class="flex w-full pt-6 px-3 container md:px-6 lg:px-8 2xl:px-10 lg:justify-between flex-col gap-3 lg:gap-10 lg:flex-row">
    <div class="flex gap-2 lg:gap-3 w-full justify-between lg:flex-row-reverse lg:w-full">
      <FloatLabel
        :pt="{
          root: { class: 'flex-1 flex lg:max-w-full' }
        }"
        variant="on"
      >
        <IconField>
          <InputText
            class="flex-1 w-full flex"
            type="text"
            :model-value="query"
            @update:model-value="$emit('update:query', $event?.trim())"
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
        href="/cocktail/random"
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
        Всего найдено <span class="font-bold"> {{ cocktails.length }} </span>
      </p>

      <div
        v-show="primaryFilters.length"
        class="hidden lg:flex gap-2"
      >
        <MultiSelect
          v-for="filter in primaryFilters"
          v-show="filter.element === filterTypes.multiSelect"
          :key="filter.key"
          :model-value="selectedFilters[filter?.key] || []"
          display="chip"
          :options="filter.options"
          filter
          :placeholder="filter.label"
          :max-selected-labels="3"
          class="lg:w-60"
          @update:model-value="onUpdateSelectedFilters({ key: filter?.key, value: $event })"
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

      <ToggleSwitch
        :model-value="isDarkTheme"
        @change="onUpdateTheme"
      >
        <template #handle="{ checked }">
          <span
            v-if="checked"
            class="material-symbols-outlined leading-[9px]! text-[11px]!"
          >
            brightness_7
          </span>

          <span
            v-else
            class="material-symbols-outlined leading-[9px]! text-[11px]!"
          >
            nightlight
          </span>
        </template>
      </ToggleSwitch>
    </div>
  </div>
</template>

<script setup lang="ts">
import CFilters from '~/modals/c-filters.vue'

import { useCocktailsStore } from '~/stores/cocktails'
import { filterTypes } from '~/constants/filterTypes'
import { useModal } from 'vue-final-modal'

import type { Cocktail } from "~/types/Cocktail"
import type { FilterItem } from "~/types/Filter"
import type { UnwrapRef } from "vue"

defineEmits(['update:query'])

const props = defineProps({
  query: {
    type: String,
    default: null,
    required: false
  }
})

const { query } = props

const cocktailsStore: ReturnType<typeof useCocktailsStore> = useCocktailsStore();
const cocktails:ComputedRef<Array<Cocktail>> = computed(() => cocktailsStore.cocktails)

const filters:ComputedRef<Array<FilterItem>> = computed(() => cocktailsStore.filters)
const primaryFiltersKey = ['cocktail_type', 'cocktail_taste']

const primaryFilters:ComputedRef<Array<FilterItem>> = computed(() => filters.value.filter(item => primaryFiltersKey.includes(item.key)))
const selectedFilters: ComputedRef<UnwrapRef<Record<string, string | number | null>>> = computed(() => cocktailsStore.selectedFilters )
const onUpdateSelectedFilters = ({ key, value = null }: { key: string; value?: string | number | null }) => {
  cocktailsStore.setSelectedFilters({ key, value })
}

const { open: openFilterPopup } = useModal({
  component: CFilters
})

const isDarkTheme = computed(() => {
  const classList = document.getElementsByTagName('html')[0].classList
  return is_dark_mode_preferred.value || classList.contains('app-dark')
})

const onUpdateTheme = () => {
  const classList = document.getElementsByTagName('html')[0].classList
  classList.toggle('app-dark')
}
const is_dark_mode_preferred = computed(() => window?.matchMedia('(prefers-color-scheme: dark)').matches)
 if (is_dark_mode_preferred.value) {
   const classList = document.getElementsByTagName('html')[0].classList
   classList.add('app-dark')
 }
</script>

