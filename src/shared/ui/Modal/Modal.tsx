'use client'

import Link from 'next/link'

import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { Portal } from '@/shared/ui/Portal/Portal'

import DTSLogo from '/public/icons/dts-logo.svg'

interface ModalProps {
  children: React.ReactNode
}

export const Modal = (props: ModalProps) => {
  usePreventScroll()

  return (
    <Portal>
      <div className="flex justify-center fixed bg-neutral-0-90 inset-0 z-50">
        <div className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative w-[400px] p-10 bg-background mx-2">
          <div className="mr-auto">
            <Link href="/">
              <DTSLogo />
            </Link>
          </div>

          {props.children}
        </div>
      </div>
    </Portal>
  )
}
