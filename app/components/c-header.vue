<template>
  <div class="flex w-full pt-6 px-3 lg:justify-between flex-col gap-3 lg:flex-row">
    <div class="flex gap-2 lg:gap-3 w-full justify-between lg:flex-row-reverse lg:w-fit">
      <FloatLabel
        :pt="{
          root: {
            class: 'flex-1 flex lg:max-w-[320px]'
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
          />

          <InputIcon @click="$emit('update:query', null)">
            <span class="material-icons cursor-pointer w-4 h-4">close</span>
          </InputIcon>
        </IconField>

        <label>Cocktail name or ingredients</label>
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
      <p class="text-base">
        Всего найдено <span class="font-bold"> 1000 </span>
      </p>

      <div class="hidden lg:flex gap-2">
        <MultiSelect
          v-for="filter in mappedFilters"
          :key="filter.key"
          :model-value="selectedFilters[filter?.key] || []"
          display="chip"
          :options="filter.options"
          option-label="name"
          filter
          :placeholder="filter.label"
          :max-selected-labels="3"
          class="lg:w-60"
        />
      </div>

      <Button
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
  import { filterTypes } from '~/constants/filterTypes.js'

  defineEmits(['update:query'])
  const props = defineProps({
    query: {
      type: String,
      default: null,
      required: false
    }
  });

  const { query } = props

  const filters = [
    {
      key: 'name',
      type: filterTypes.multiSelect,
      label: 'name',
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 1',
      type: filterTypes.multiSelect,
      label: 'name 1',
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 2',
      type: filterTypes.multiSelect,
      label: 'name 2',
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 3',
      type: filterTypes.multiSelect,
      label: 'name 3',
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 4',
      type: filterTypes.multiSelect,
      label: 'name 4',
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 5',
      type: filterTypes.multiSelect,
      label: 'name 5',
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 6',
      type: filterTypes.multiSelect,
      label: 'name 6',
      options: [
        {
          name: 'Name'
        }
      ]
    }
  ]
  const primaryFiltersKey = ['name', 'name 1']
  const mappedFilters = computed(() => filters.filter(item => primaryFiltersKey.includes(item.key)))
  const selectedFilters = ref({})
  const openFilterPopup = () => {}
</script>

