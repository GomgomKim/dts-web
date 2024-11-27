'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/entities/user-profile/model/store'

import { LoadingSpinner } from '@/shared/ui/loading-spinner'

interface AuthCheckProps {
  children: React.ReactNode
  routePath?: string
  isGettingToken: boolean | null
}

export default function AuthCheck(props: AuthCheckProps) {
  const isAuth = useAuthStore((state) => state.isAuth)
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuth === null) {
      const history = localStorage.getItem('dts-auth-store')

      if (!history) setIsAuth(false)

      setLoading(true)
    } else {
      if (!isAuth && props.isGettingToken === false) {
        router.replace(props.routePath ? props.routePath : '/signup')
      }
      if (props.isGettingToken !== null) {
        setLoading(false)
      }
    }
  }, [isAuth, router, props.isGettingToken])

  if (loading || props.isGettingToken === null) {
    return <LoadingSpinner width="40" height="40" />
  }

  if (!isAuth && props.isGettingToken === false) {
    return null
  }

  return <>{props.children}</>
}
