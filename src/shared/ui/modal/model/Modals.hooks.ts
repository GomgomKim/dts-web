import { ComponentType } from 'react'

import { useModalsDispatchContext } from './Modals.context'
import { CloseModalType, ModalComponentProps, OpenModalType } from './types'

export default function useModals() {
  const { open, close } = useModalsDispatchContext() as {
    open: OpenModalType
    close: CloseModalType
  }

  const openModal = <T extends ModalComponentProps>(
    Component: ComponentType<T>,
    props?: T
  ) => {
    open(Component, props)
  }

  const closeModal = <T extends ModalComponentProps>(
    Component: ComponentType<T>
  ) => {
    close(Component)
  }

  return { openModal, closeModal }
}
