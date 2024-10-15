import * as React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

import { dtsAxios } from '@/shared/api'

export const useGetAuthToken = ({ redirectPath }: { redirectPath: string }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const logIn = useAuthStore((state) => state.logIn)
  const isAuth = useAuthStore((state) => state.isAuth)

  React.useEffect(() => {
    if (isAuth === true) {
      return
    }

    // 로그인 직후
    if (searchParams.has('oAuthProviderType') && searchParams.has('code')) {
      const oAuthProviderType = searchParams.get('oAuthProviderType') as string
      const code = searchParams.get('code') as string

      getTokens(oAuthProviderType, code).then((headers) => {
        if (headers) {
          const token = {
            accessToken: headers['authorization'],
            refreshToken: headers['refresh-token']
          }

          logIn(token)

          router.replace(redirectPath)
        }
      })
    }
  }, [searchParams])
}

const getTokens = async (oAuthProviderType: string, code: string) => {
  // try {
  const response = await dtsAxios.get('/auth/access-token', {
    params: {
      oAuthProviderType,
      code
    }
  })
  return response.headers
  // } catch (error) {
  //   console.error('Error fetching tokens:', error)
  // }
}
