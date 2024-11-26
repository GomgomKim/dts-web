'use client'

import { ReactNode, useMemo, useState } from 'react'

import { Modals } from '@/shared/ui/Modal/Modals'

import {
  ModalsDispatchContext,
  ModalsStateContext
} from '../../shared/ui/Modal/model/Modals.context'
import { ModalInfo } from '../../shared/ui/Modal/model/types'

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<ModalInfo[]>([])

  const open = (
    Component: ModalInfo['Component'],
    props?: ModalInfo['props']
  ) => {
    setOpenedModals((prevModals) => {
      return [
        ...prevModals,
        {
          Component,
          props
          // isOpen: true
        }
      ]
    })
  }

  const close = (Component: ModalInfo['Component']) => {
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
