import { useModalsDispatchContext } from './ModalsContext'
import { ModalInfo } from './types'

export default function useModals() {
  const { open, close } = useModalsDispatchContext()

  const openModal = (
    Component: ModalInfo['Component'],
    props?: ModalInfo['props']
  ) => {
    open(Component, props)
  }

  const closeModal = (Component: ModalInfo['Component']) => {
    close(Component)
  }

  return { openModal, closeModal }
}
