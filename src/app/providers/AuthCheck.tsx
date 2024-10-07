'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

import { LoadingSpinner } from '@/shared/ui/LoadingSpinner'

interface AuthCheckProps {
  children: React.ReactNode
  routePath?: string
}

export default function AuthCheck({ children, routePath }: AuthCheckProps) {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const router = useRouter()

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (isAuth === null) {
      const history = localStorage.getItem('dts-auth-store')

      if (!history) setIsAuth(false)

      setLoading(true)
    } else {
      if (!isAuth) {
        router.replace(routePath ? routePath : '/login')
      }

      setLoading(false)
    }
  }, [isAuth, router])

  if (loading) {
    return <LoadingSpinner width="40" height="40" />
  }

  if (!isAuth) {
    return null
  }

  return <>{children}</>
}
