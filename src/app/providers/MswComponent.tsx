'use client'

import { useEffect } from 'react'

export function MswComponent() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser')
      }
    }
  }, [])

  return null
}
