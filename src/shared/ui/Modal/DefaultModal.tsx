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

        <div>
          <div className="mb-[2rem]">
            <div className="text-[24px] mb-3 font-semibold">{props.title}</div>
            <p className="text-neutral-7 text-[14px]">{props.description}</p>
          </div>

          {props.slot}

          <div className="mt-3 text-center">
            <Link
              href="https://tally.so/r/314QEg"
              target="_blank"
              className="text-[14px] underline underline-offset-4 p-3 inline-block text-center"
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
