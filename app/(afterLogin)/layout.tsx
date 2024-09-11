'use client'

import * as React from 'react'
import { useAuthStore } from '@/entities/user/store'
import { useRouter } from 'next/navigation'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { isAuth } = useAuthStore.getState()

  if (isAuth === null) return <div>Loading...</div>

  return isAuth === true ? <>{children}</> : router.replace('/login')
}
