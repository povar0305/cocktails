export interface ModalOptions {
  contentTransition: string;
  swipeToClose: 'none' | 'down' | 'up' | 'right' | 'left' | undefined;
  class: string;
  contentClass: string;
  overlayClass: string;
  overlayTransition: string;
}
