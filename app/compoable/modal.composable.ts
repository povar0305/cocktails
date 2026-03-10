import { ref } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export const useModalOptions = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const breakpointSmallerMd: Ref<boolean> = breakpoints.smaller('md')

  const options = ref<{
    contentTransition: string
    swipeToClose: 'none' | 'down' | 'up' | 'right' | 'left' | undefined
    class: string
    contentClass: string
    overlayClass: string
    overlayTransition: string
  }>({
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
