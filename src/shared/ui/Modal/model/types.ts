import { ComponentProps, ComponentType } from 'react'

interface ModalComponentProps extends ComponentProps<'div'> {
  // isOpen: boolean
  onClose?: () => void
}

export interface ModalInfo {
  Component: ComponentType<ModalComponentProps>
  props?: Record<string, unknown>
  // isOpen: boolean
  onClose?: () => void
}
