'use client'

import Explore from '@/views/explore/ui'
import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/entities/user/store'
import { dtsAxios } from '@/shared/api'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { logIn, isAuth } = useAuthStore.getState()

  React.useEffect(() => {
    // already logged in
    if (isAuth === null) {
      console.log('로그인 전, isAuth === null')
    }

    if (isAuth === false) {
      console.log('로그아웃! isAuth === false')
    }

    if (isAuth === true) {
      console.log('로그인 된 상태, isAuth === true')
      return
    }

    // 로그인 직후
    if (searchParams.has('oAuthProviderType') && searchParams.has('code')) {
      const getTokens = async () => {
        const response = await dtsAxios.get('/auth/access-token', {
          params: {
            oAuthProviderType: searchParams.get('oAuthProviderType'),
            code: searchParams.get('code')
          }
        })
        return response.headers
      }

      getTokens().then((headers) => {
        logIn({
          accessToken: headers['authorization'],
          refreshToken: headers['refresh-token']
        })
      })
      router.replace('/explore')
    }
  }, [searchParams])

  return <Explore />
}
