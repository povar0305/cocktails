<template>
  <Card>
    <template #title>{{ cocktail.cocktail_name }}</template>

    <template #subtitle>{{ cocktail.cocktail_author }}</template>

    <template #content>
      {{getComplexityCards(cocktail.cocktail_complexity_type)}}
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
      </p>
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

defineProps({
  cocktail: {
    type: String,
    default: null,
    required: false
  }
})

const complexitys = {
  'легко' : 1
}

const getComplexityCards = (complexity) => {
  return complexitys[complexity] || 0
}
</script>
