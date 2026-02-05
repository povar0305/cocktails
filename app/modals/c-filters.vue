<template>
  <vue-final-modal
    :overlay-class="options.overlayClass"
    :class="options.class"
    :content-class="[options.contentClass, 'me-become-supplier-modal']"
    :overlay-transition="options.overlayTransition"
    :content-transition="options.contentTransition"
    :swipe-to-close="options.swipeToClose"
    :esc-to-close="true"
    @closed="$emit('update:model-value', false)"
  >
    <template #default>
      <div
        :class="[
          'column-start w-full',
          '[&_[data-pc-section=container]]:p-0'
        ]"
      >
        Фильтры
      </div>
    </template>
  </vue-final-modal>
</template>

<script setup>
import { useModalOptions } from '~/compoable/modal.composable.js'
import { VueFinalModal } from 'vue-final-modal'

const { options } = useModalOptions()
</script>
