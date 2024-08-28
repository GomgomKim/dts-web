'use client'

import { useAuthStore } from '@/entities/user/store'
import { dtsAxios } from '@/shared/api'
import Explore from '@/views/explore/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const logIn = useAuthStore((state) => state.logIn)
  const isAuth = useAuthStore((state) => state.isAuth)

  useEffect(() => {
    if (isAuth) return

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
    } else {
      console.log('not logged in ')
    }
  }, [searchParams])

  return <Explore />
}
