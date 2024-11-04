'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'

import DTSLogo from '/public/icons/dts-logo.svg'

interface DefaultModalProps {
  children: React.ReactNode
  // isOpen: boolean
  closable: {
    isClosable: boolean
    onClose: () => void
  }
}

export const DefaultModal = (props: DefaultModalProps) => {
  const modalRef = React.useRef(null)
  const router = useRouter()

  const handleClose = () => {
    props.closable.isClosable ? props.closable.onClose() : null
  }

  const handleClickLogo = () => {
    props.closable.onClose()
    router.push('/')
  }

  usePreventScroll()
  useOutsideClick(modalRef, handleClose)

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div className="flex justify-center fixed bg-neutral-0-90 inset-0 z-50">
      <div
        ref={modalRef}
        className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative w-[400px] p-10 bg-background mx-2"
      >
        <div className="mr-auto">
          <button onClick={handleClickLogo}>
            <DTSLogo />
          </button>
        </div>

        {props.children}
      </div>
    </div>
  )
}

DefaultModal.displayName = 'DefaultModal'
