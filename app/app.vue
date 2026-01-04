<template>
  <div class="flex flex-col">
    <Input
      :value="query"
    />
  </div>

  <NuxtPage />
</template>

<script setup>
  const route = useRoute()
  const query = ref(route?.query?.search || null)
</script>
