'use client'

import { ComponentType, ReactNode, useMemo, useState } from 'react'

import { Modals } from '@/shared/ui/modal/Modals'

import {
  ModalsDispatchContext,
  ModalsStateContext
} from '../../shared/ui/modal/model/Modals.context'
import {
  ModalComponentProps,
  ModalInfo
} from '../../shared/ui/modal/model/types'

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<ModalInfo[]>([])

  const open = <T extends ModalComponentProps>(
    Component: ComponentType<T>,
    props?: T
  ) => {
    setOpenedModals((prevModals) => {
      return [
        ...prevModals,
        {
          Component: Component as ComponentType<ModalComponentProps>,
          props
        } as ModalInfo
      ]
    })
  }

  const close = <T extends ModalComponentProps>(
    Component: ComponentType<T>
  ) => {
    setOpenedModals((prevModals) => {
      return prevModals.filter((item) => item.Component !== Component)
    })
  }

  const dispatch = useMemo(() => ({ open, close }), [])

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        <Modals />
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  )
}
