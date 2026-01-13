<template>
  <div class="flex w-full pt-6 px-3 lg:justify-between">
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

    <div class="hidden lg:flex lg:gap-3 lg:items-center">
      <p class="text-base">
        Всего найдено <span class="font-bold"> 1000 </span>
      </p>

      <div class="flex gap-2">
        <MultiSelect
          v-for="filter in filters"
          :key="filter.key"
          :model-value="selectedFilters[filter?.key] || []"
          display="chip"
          :options="filter.options"
          optionLabel="name"
          filter
          placeholder="Select Cities"
          :maxSelectedLabels="3"
          class="lg:w-60"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
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
      options: [
        {
          name: 'Name'
        }
      ]
    },
    {
      key: 'name 1',
      options: [
        {
          name: 'Name'
        }
      ]
    }
  ]
  const selectedFilters = ref({})
</script>

