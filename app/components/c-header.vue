<template>
  <div class="flex w-full pt-6 px-3">
    <div class="flex gap-2 w-full justify-between">
      <FloatLabel
        :pt="{
          root: {
            class: 'flex-1 flex'
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

  </div>
</template>

<script setup>
  defineEmits(['update:query'])
  const { query } = defineProps({
    query: {
      type: String,
      default: null,
      required: false
    }
  });
</script>

