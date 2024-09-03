'use client'

import { useAuthStore } from '@/entities/user/store'
import useAxiosAuthInterceptor from '@/entities/user/use-axios-auth-interceptor'
import { useRouter } from 'next/navigation'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isAuth = useAuthStore((state) => state.isAuth)

  useAxiosAuthInterceptor()

  if (isAuth === null) return null

  return isAuth ? children : router.replace('/login')
}
