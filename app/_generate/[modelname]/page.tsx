'use client'

import { useCallback, useLayoutEffect, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import AuthCheck from '@/app/providers/AuthCheck'

import Generate from '@/views/generate'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'

export default function Page() {
  const [isGettingToken, setIsGettingToken] = useState<boolean | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const modelName = pathname.split('/')[2]
  const modelId = searchParams.get('id')

  const currentPageInfo =
    modelName && modelId ? `?name=${modelName}&id=${modelId}` : ''

  const toggleIsGettingToken = useCallback((value: boolean) => {
    setIsGettingToken(value)
  }, [])

  useGetAuthToken({
    redirectUri: 'generate',
    toggleIsGettingToken
  })

  useLayoutEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }
    setVh()

    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])

  return (
    <AuthCheck
      isGettingToken={isGettingToken}
      routePath={`/signup${currentPageInfo}`}
    >
      <Generate isGettingToken={isGettingToken} />
    </AuthCheck>
  )
}
