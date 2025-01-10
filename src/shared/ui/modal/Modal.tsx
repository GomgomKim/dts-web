'use client'

import { useEffect, useRef } from 'react'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { cn } from '@/shared/lib/utils'

interface ModalProps {
  onCloseModal: () => void
  children: React.ReactNode
  className?: string
}

export const Modal = (props: ModalProps) => {
  const modalRef = useRef<null | HTMLDivElement>(null)

  usePreventScroll()
  useClickOutside(modalRef, props.onCloseModal)

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onCloseModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-neutral-0-90">
      <div
        ref={modalRef}
        className={cn(
          'relative m-auto mx-2 min-w-[480px] rounded-[12px] border border-neutral-2 bg-background p-10',
          props.className
        )}
      >
        {props.children}
      </div>
    </div>
  )
}
