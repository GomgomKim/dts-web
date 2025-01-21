'use client'

import { useCallback, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { useKeydown } from '@/shared/lib/hooks/useKeydown'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { cn } from '@/shared/lib/utils'

import DTSLogo from '/public/icons/dts-logo.svg'

import { Button } from '../button'

interface DefaultModalProps {
  className?: string
  closeable?: {
    isCloseable: boolean
    onClose: () => void
    withCancel: boolean
  }
  withLogo?: boolean
  title: React.ReactNode
  description: React.ReactNode
  children?: React.ReactNode // modal contents
  footer?: React.ReactNode
}

export const DefaultModal = (props: DefaultModalProps) => {
  const modalRef = useRef<null | HTMLDivElement>(null)
  const router = useRouter()

  const handleClose = useCallback(() => {
    props.closeable?.isCloseable ? props.closeable.onClose() : null
  }, [props.closeable])

  const handleClickLogo = () => {
    props.closeable?.onClose()
    router.push('/')
  }

  usePreventScroll()
  useClickOutside(modalRef, handleClose)
  useKeydown(handleClose)

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-neutral-0-90">
      <div
        ref={modalRef}
        className={cn(
          'relative m-auto mx-2 flex min-w-[400px] flex-col gap-8 rounded-[12px] border border-neutral-2 bg-background p-10',
          props.className
        )}
      >
        {/* logo */}
        {props.withLogo ? (
          <div className="mb-2 mr-auto">
            <button onClick={handleClickLogo} className="block">
              <DTSLogo />
            </button>
          </div>
        ) : null}

        {/* header */}
        <div>
          <div className="mb-3 text-[1.5rem] font-semibold">{props.title}</div>
          <p className="text-[0.875rem] text-neutral-7">{props.description}</p>
        </div>

        {/* contents */}
        {props.children ? <div>{props.children}</div> : null}

        {/* footer */}
        <div>
          {props.footer}

          {/* close button */}
          {props.closeable?.isCloseable && props.closeable?.withCancel ? (
            <div className="text-center">
              <Button
                variant="link"
                size="small"
                className="mt-3 text-white underline underline-offset-[3px]"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

DefaultModal.displayName = 'DefaultModal'
