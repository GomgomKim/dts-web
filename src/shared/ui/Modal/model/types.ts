import { ComponentProps, ComponentType } from 'react'

export interface ModalComponentProps extends ComponentProps<'div'> {
  onCloseModal: () => void
  onClose?: () => void
}

export interface ModalInfo {
  Component: ComponentType<ModalComponentProps>
  props?: Record<string, unknown>
}
