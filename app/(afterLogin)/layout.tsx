'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/entities/UserProfile/store'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isAuth = useAuthStore((state) => state.isAuth)

  return isAuth === true ? <>{children}</> : router.replace('/login')
}
