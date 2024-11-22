'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

// import { ErrorModals } from '@/entities/ErrorModal/ErrorModals'
import { useAuthStore } from '@/entities/UserProfile/store'

import { dtsAxios } from '@/shared/api'

import { useClientSearchParams } from './useClientSearchParams'

type RedirectUri = 'explore' | 'generate'

interface UseGetAuthTokenParams {
  redirectPath?: string
  redirectUri: RedirectUri
  toggleIsGettingToken?: (value: boolean) => void
}

export const useGetAuthToken = (params: UseGetAuthTokenParams) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const logIn = useAuthStore((state) => state.logIn)
  const isAuth = useAuthStore((state) => state.isAuth)

  const { removeSearchParams } = useClientSearchParams({ action: 'replace' })

  useEffect(() => {
    if (isAuth === true) {
      params.toggleIsGettingToken?.(false)
      return
    }

    // 로그인 직후
    if (searchParams.has('oAuthProviderType') && searchParams.has('code')) {
      params.toggleIsGettingToken?.(true)
      const oAuthProviderType = searchParams.get('oAuthProviderType') as string
      const code = searchParams.get('code') as string

      const redirectUri = getRedirectUri(params.redirectUri)

      getTokens(oAuthProviderType, code, redirectUri)
        .then((headers) => {
          if (headers) {
            const token = {
              accessToken: headers['authorization'],
              refreshToken: headers['refresh-token']
            }

            logIn(token)

            if (params.redirectPath) {
              router.replace(params.redirectPath)
            } else {
              removeSearchParams(['oAuthProviderType', 'code'])
            }

            params.toggleIsGettingToken?.(false)
          }
        })
        .catch((error) => {
          //TODO: api error handling
          console.error('Error fetching tokens:', error)
        })
    } else {
      params.toggleIsGettingToken?.(false)
    }
  }, [searchParams, router])
}

const getTokens = async (
  oAuthProviderType: string,
  code: string,
  redirectUri: string
) => {
  const response = await dtsAxios.get('/auth/access-token', {
    params: {
      oAuthProviderType,
      code,
      redirectUri
    }
  })
  return response.headers
}

const getRedirectUri = (uri: RedirectUri) => {
  return (
    process.env.NEXT_PUBLIC_REDIRECT_BASE_URL +
    '/' +
    uri +
    '?oAuthProviderType=GOOGLE'
  )
}
