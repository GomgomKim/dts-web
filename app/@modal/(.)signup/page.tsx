'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { Signup } from '@/entities/Signup'

import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { usePathStore } from '@/shared/lib/stores/usePathStore'

export default function Page() {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  const prevPathname = usePathStore((state) => state.prevPath)

  const handleOutsideClick = () => {
    if (prevPathname.includes('explore')) router.back()
    else router.replace('/')
  }

  useOutsideClick(modalRef, handleOutsideClick)
  usePreventScroll()

  return <Signup modalRef={modalRef} />
}
