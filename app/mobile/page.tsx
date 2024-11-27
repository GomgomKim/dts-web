'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Mobile from '@/views/mobile'

import { useAuthStore } from '@/entities/user-profile/model/store'

export default function Page() {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  useEffect(() => {
    if (isAuth === true) {
      router.replace('/mobile/explore')
    }
  }, [isAuth])

  return <>{isAuth !== true ? <Mobile /> : null}</>
}
