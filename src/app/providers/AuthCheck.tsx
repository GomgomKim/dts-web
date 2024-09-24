'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (isAuth === null) {
      setLoading(true)
    } else {
      setLoading(false)
      if (!isAuth) {
        router.replace('/login')
      }
    }
  }, [isAuth, router])

  if (loading) {
    return <div>auth checking...</div>
  }

  if (!isAuth) {
    return null
  }

  return <>{children}</>
}
