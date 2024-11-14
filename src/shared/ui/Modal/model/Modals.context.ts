'use client'

import { createContext, useContext } from 'react'

import { ModalInfo } from './types'

export const ModalsStateContext = createContext<ModalInfo[]>([])

export const useModalsStateContext = () => {
  const context = useContext(ModalsStateContext)
  if (!context) {
    throw new Error('ModalsContextState must be used within a ModalsProvider')
  }
  return context
}

//
type ModalsDispatchContextState = {
  open: (Component: ModalInfo['Component'], props?: ModalInfo['props']) => void
  close: (Component: ModalInfo['Component']) => void
}

export const ModalsDispatchContext =
  createContext<ModalsDispatchContextState | null>(null)

export const useModalsDispatchContext = () => {
  const context = useContext(ModalsDispatchContext)
  if (!context) {
    throw new Error(
      'ModalsDispatchContext must be used within a ModalsProvider'
    )
  }
  return context
}
