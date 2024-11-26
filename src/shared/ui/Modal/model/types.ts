import { ComponentProps, ComponentType } from 'react'

export interface ModalComponentProps extends ComponentProps<'div'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ModalInfo {
  Component: ComponentType<ModalComponentProps>
  props?: ModalComponentProps
}
