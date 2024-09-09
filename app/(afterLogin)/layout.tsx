'use client'

import { useAuthStore } from '@/entities/user/store'
import { useRouter } from 'next/navigation'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isAuth = useAuthStore((state) => state.isAuth)

  if (isAuth === null) return router.replace('/login')

  return isAuth ? children : router.replace('/login')
}
