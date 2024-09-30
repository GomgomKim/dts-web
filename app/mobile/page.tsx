'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import Mobile from '@/views/mobile'

import { useAuthStore } from '@/entities/UserProfile/store'

export default function Page() {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  React.useEffect(() => {
    if (isAuth === true) {
      router.replace('/mobile/explore')
    }
  }, [isAuth])

  return <>{isAuth !== true ? <Mobile /> : null}</>
}
