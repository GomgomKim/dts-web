'use client'

import React from 'react'
import ReactDom from 'react-dom'

import {
  useModalsDispatchContext,
  useModalsStateContext
} from './model/Modals.context'

export const Modals = () => {
  const openedModals = useModalsStateContext()
  const { close } = useModalsDispatchContext()

  if (typeof window === 'undefined') return <></>

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return ReactDom.createPortal(
    <>
      {openedModals.map((modalInfo, index) => {
        const { Component, props } = modalInfo

        const onCloseModal = () => {
          close(Component)
        }

        return <Component key={index} onCloseModal={onCloseModal} {...props} />
      })}
    </>,
    document.getElementById('modal-root') as HTMLElement
  )
}
