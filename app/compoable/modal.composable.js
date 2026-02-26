import { ref } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export const useModalOptions = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const breakpointSmallerMd = breakpoints.smaller('md')
  const options = ref({
    contentTransition: breakpointSmallerMd.value ? 'vfm-slide-down' : 'fade',
    swipeToClose: breakpointSmallerMd.value ? 'down' : 'none',
    class: 'c-modal',
    contentClass: 'c-modal-content',
    overlayClass: 'c-modal-overlay',
    overlayTransition: 'vfm-fade'
  })

  return {
    options
  }
}
