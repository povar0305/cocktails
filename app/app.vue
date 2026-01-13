<template>
  <div class="w-full fixed h-full bg-white">
    <c-header :query="query"/>

    <NuxtPage />
  </div>
</template>

<script setup>
  import CHeader from './components/c-header.vue'

  const route = useRoute()
  const query = ref(route?.query?.search || null)
</script>
