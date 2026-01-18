<template>
  <Card>
    <template #header>
      <img alt="user header" src="https://lh3.googleusercontent.com/o7n-TM_Iyn-cRoPSyqG5Ki7G_OibAvPMeSGjVbZo0zfJaeuPlnBa9twGwMVJM4Mv5nwMrc1excPbFBjpdxmaY5YW=s60" />
    </template>

    <template #title>Advanced Card</template>

    <template #subtitle>Card subtitle</template>

    <template #content>
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
</script>
