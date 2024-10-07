'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  React.useEffect(() => {
    router.replace('/explore?filterType=ALL')
  }, [router])

  return null
}
