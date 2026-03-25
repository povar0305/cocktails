import { ref } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import type { ModalOptions } from "~/types/ModalOptions";

export const useModalOptions = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const breakpointSmallerMd: Ref<boolean> = breakpoints.smaller('md')

  const options = ref<ModalOptions>({
    contentTransition: breakpointSmallerMd.value ? 'vfm-slide-down' : 'fade',
    swipeToClose: breakpointSmallerMd.value ? 'down' : 'none',
    class: 'modal',
    contentClass: 'modal-content',
    overlayClass: 'modal-overlay',
    overlayTransition: 'vfm-fade'
  })

  return {
    options
  }
}
