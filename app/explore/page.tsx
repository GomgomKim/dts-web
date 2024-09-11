'use client'

import Explore from '@/views/explore/ui'
import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/entities/user/store'
import { dtsAxios } from '@/shared/api'
import {
  GetAuthProfileReqData,
  GetAuthProfileResData
} from '@/entities/user/model'
import { AxiosError, AxiosResponse } from 'axios'
import { URL_AUTH_PROFILE } from '@/entities/user/constant'
import { Tokens } from '@/entities/user/type'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // 이렇게 하면 무조건 explore 페이지로 리다이렉션?
  const { logIn, isAuth, setUser, setRestriction } = useAuthStore.getState()

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
          router.replace('/explore')
        }
      })
    }
  }, [searchParams, isAuth])

  return <Explore />
}
