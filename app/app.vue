<template>
  <div class="w-full fixed h-full">
    <c-header
      :query="query"
      @update:query="onUpdateQuery"
    />

    <NuxtPage />
  </div>
</template>

<script setup>
  import CHeader from './components/c-header.vue'

  const route = useRoute()
  const query = ref(route?.query?.search || null)

  const onUpdateQuery = (newValue) => {
    if (typeof newValue === 'string' || !newValue) {
      query.value = newValue
    }
  }
</script>
