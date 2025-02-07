'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import Login from '@/views/log-in'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'

export default function Page() {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => router.back())
  usePreventScroll()

  return <Login modalRef={modalRef} />
}
