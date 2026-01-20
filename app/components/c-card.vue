<template>
  <Card>
    <template #title>{{ cocktail.cocktail_name }}</template>

    <template #subtitle>
      <div class="flex gap-2">
        <span class="material-symbols-outlined">
          person
        </span>

        {{ cocktail.cocktail_author }}
      </div>
    </template>

    <template #content>
      <div
        v-show="cocktail?.cocktail_taste.length"
        class="flex gap-2 flex-wrap"
      >
        <Chip
          v-for="chip in cocktail?.cocktail_taste"
          :key="chip"
          :label="chip"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';
import Chip from 'primevue/chip';

defineProps({
  cocktail: {
    type: String,
    default: null,
    required: false
  }
})
</script>
