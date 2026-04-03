<template>
  <ToggleSwitch
      v-model="checked"
  >
    <template #handle="{ checked }">
      <span
          v-if="checked"
          class="material-icons text-[12px]! leading-[11px]!"
      >
        brightness_7
      </span>

      <span
          v-else
          class="material-icons text-[12px]! leading-[11px]!"
      >
        nightlight
      </span>
    </template>
  </ToggleSwitch>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>