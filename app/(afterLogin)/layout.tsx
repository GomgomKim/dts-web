'use client'

import { useAuthStore } from '@/entities/user/store'
import useAxiosAuthInterceptor from '@/entities/user/use-axios-auth-interceptor'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isAuth = useAuthStore((state) => state.isAuth)

  useAxiosAuthInterceptor()

  useEffect(() => {
    if (!isAuth) {
      router.replace('/login')
    }
  }, [isAuth])

  return isAuth ? children : null
}
