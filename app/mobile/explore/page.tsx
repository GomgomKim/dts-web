'use client'

import * as React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import AuthCheck from '@/app/providers/AuthCheck'

import { useAuthStore } from '@/entities/UserProfile/store'
import { Instructions } from '@/entities/mobile/ui/Instructions'

import { dtsAxios } from '@/shared/api'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isAuth = useAuthStore((state) => state.isAuth)
  const logIn = useAuthStore((state) => state.logIn)

  React.useEffect(() => {
    if (isAuth === true) return

    // 로그인 직후
    if (searchParams.has('oAuthProviderType') && searchParams.has('code')) {
      const getTokens = async () => {
        // try {
        const response = await dtsAxios.get('/auth/access-token', {
          params: {
            oAuthProviderType: searchParams.get('oAuthProviderType'),
            code: searchParams.get('code')
          }
        })
        return response.headers
        // } catch (error) {
        //   console.error('Error fetching tokens:', error)
        // }
      }

      getTokens().then((headers) => {
        if (headers) {
          const token = {
            accessToken: headers['authorization'],
            refreshToken: headers['refresh-token']
          }

          logIn(token)

          router.replace('/mobile/explore')
        }
      })
    }
  }, [searchParams])

  return (
    <AuthCheck routePath="/mobile">
      <div className="absolute-center">
        <Instructions />
      </div>
    </AuthCheck>
  )
}
