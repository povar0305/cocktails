<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Checkbox :model-value="true" binary />
    <Checkbox :model-value="true" binary />
    <Checkbox :model-value="true" binary />
    <Checkbox :model-value="true" binary />
  </div>

  <NuxtPage />
</template>
