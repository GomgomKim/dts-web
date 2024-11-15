'use client'

import * as React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'

import DTSLogo from '/public/icons/dts-logo.svg'

interface DefaultModalProps {
  closeable?: {
    isCloseable: boolean
    onClose: () => void
  }
  title: React.ReactNode
  description: React.ReactNode
  slot: React.ReactNode
}

export const DefaultModal = (props: DefaultModalProps) => {
  const modalRef = React.useRef(null)
  const router = useRouter()

  const handleClose = React.useCallback(() => {
    props.closeable?.isCloseable ? props.closeable.onClose() : null
  }, [props.closeable])

  const handleClickLogo = () => {
    props.closeable?.onClose()
    router.push('/')
  }

  usePreventScroll()
  useClickOutside(modalRef, handleClose)

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
    <div className="fixed inset-0 z-50 flex justify-center bg-neutral-0-90">
      <div
        ref={modalRef}
        className="relative m-auto mx-2 flex w-[400px] flex-col gap-10 rounded-[12px] border border-neutral-2 bg-background p-10"
      >
        <div className="mr-auto">
          <button onClick={handleClickLogo}>
            <DTSLogo />
          </button>
        </div>

        <div>
          <div className="mb-8">
            <div className="mb-3 text-[24px] font-semibold">{props.title}</div>
            <p className="text-[14px] text-neutral-7">{props.description}</p>
          </div>

          {props.slot}

          <div className="mt-3 text-center">
            <Link
              href="https://tally.so/r/314QEg"
              target="_blank"
              className="inline-block p-3 text-center text-[14px] underline underline-offset-4"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

DefaultModal.displayName = 'DefaultModal'
