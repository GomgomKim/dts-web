'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { dtsAxios } from '@/shared/api'
import { Tokens } from '@/shared/api/types'
import { URL_AUTH_PROFILE } from '@/entities/UserProfile/constant'
import {
  GetAuthProfileReqData,
  GetAuthProfileResData
} from '@/entities/UserProfile/model/types'
import { useAuthStore } from '@/entities/UserProfile/store'
import Explore from '@/views/explore'
import { AxiosError, AxiosResponse } from 'axios'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const logIn = useAuthStore((state) => state.logIn)
  const isAuth = useAuthStore((state) => state.isAuth)
  const setUser = useAuthStore((state) => state.setUser)
  const setRestriction = useAuthStore((state) => state.setRestriction)

  React.useEffect(() => {
    if (isAuth === true) {
      return
    }

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

      const getUserProfile = async (token: Tokens) => {
        //   try {
        const response = await dtsAxios.get<
          GetAuthProfileReqData,
          AxiosResponse<GetAuthProfileResData, AxiosError>
        >(URL_AUTH_PROFILE, {
          headers: {
            Authorization: token.accessToken,
            'Refresh-Token': token.refreshToken
          }
        })
        return response.data
        //   } catch (error) {
        //     console.error('Error fetching user profile:', error)
        //   }
      }

      getTokens().then((headers) => {
        if (headers) {
          const token = {
            accessToken: headers['authorization'],
            refreshToken: headers['refresh-token']
          }

          logIn(token)

          getUserProfile(token).then((res) => {
            if (res) {
              const { email, profileImageUrl, restriction } = res.content
              setUser({ email, profileImageUrl })
              setRestriction(restriction)
            }
          })
          router.replace('/explore?filterType=ALL')
        }
      })
    }
  }, [searchParams])

  return <Explore />
}
