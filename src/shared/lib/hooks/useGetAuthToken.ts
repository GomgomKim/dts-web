'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

// import { ErrorModals } from '@/entities/ErrorModal/ErrorModals'
import { dtsAxios } from '@/shared/api'

import { useAuthStore } from '../stores/useAuthStore'
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
    if (isAuth === null) return

    if (isAuth === true) {
      params.toggleIsGettingToken?.(false)
      return
    }

    // isAuth: false
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
          }
        })
        .catch((error) => {
          console.error('Error fetching tokens:', error)
        })
        .finally(() => {
          // 현재 API 에러처리 로직이 없으므로
          // 토큰에러 발생 여부와 상관없이 ui를 렌더링하여
          // 다른 API 요청에서 올바르지 않은 토큰이면 애러바운더리를 통해 에러 처리
          params.toggleIsGettingToken?.(false)
        })
    } else {
      params.toggleIsGettingToken?.(false)
    }
  }, [searchParams, router, isAuth])
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
