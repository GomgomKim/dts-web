'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { Signup } from '@/entities/Signup'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
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

  useClickOutside(modalRef, handleOutsideClick)
  usePreventScroll()

  return <Signup modalRef={modalRef} />
}
