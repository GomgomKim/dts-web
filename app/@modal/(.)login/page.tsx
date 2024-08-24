'use client'

import { Login } from '@/entities/Login/Login'
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function Page() {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick(modalRef, () => router.back())
  usePreventScroll()

  return <Login modalRef={modalRef} />
}
