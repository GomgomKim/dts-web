'use client'

import { useAuthStore } from '@/entities/user/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { isAuth } = useAuthStore()

  useEffect(() => {
    if (isAuth !== null) {
      router.replace('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuth !== null ? null : children
}
