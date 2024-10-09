import * as React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { URL_AUTH_PROFILE } from '@/entities/UserProfile/constant'
import {
  GetAuthProfileReqData,
  GetAuthProfileResData
} from '@/entities/UserProfile/model/types'
import { useAuthStore } from '@/entities/UserProfile/store'

import { dtsAxios } from '@/shared/api'
import { Tokens } from '@/shared/api/types'

import { AxiosError, AxiosResponse } from 'axios'

export const useGetAuthToken = ({ redirectPath }: { redirectPath: string }) => {
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
      const oAuthProviderType = searchParams.get('oAuthProviderType') as string
      const code = searchParams.get('code') as string

      getTokens(oAuthProviderType, code).then((headers) => {
        if (headers) {
          const token = {
            accessToken: headers['authorization'],
            refreshToken: headers['refresh-token']
          }

          logIn(token)

          // TODO: 프로필 컴포넌트로 이동 & 프리페치
          getUserProfile(token).then((res) => {
            if (res) {
              const { email, profileImageUrl, restriction } = res.content
              setUser({ email, profileImageUrl })
              setRestriction(restriction)
            }
          })
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
