'use client'

import React from 'react'
import ReactDom from 'react-dom'

import {
  useModalsDispatchContext,
  useModalsStateContext
} from './model/ModalsContext'

const Modals = () => {
  const openedModals = useModalsStateContext()
  const { close } = useModalsDispatchContext()

  if (typeof window === 'undefined') return <></>

  return ReactDom.createPortal(
    <>
      {openedModals.map((modalInfo, index) => {
        const { Component, props } = modalInfo

        const onClose = () => {
          close(Component)
        }

        return <Component key={index} onClose={onClose} {...props} />
      })}
    </>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default Modals
