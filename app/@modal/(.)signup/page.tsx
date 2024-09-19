'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { Signup } from '@/entities/Signup'

import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'

export default function Page() {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick(modalRef, () => router.back())
  usePreventScroll()

  return <Signup modalRef={modalRef} />
}
