import { dtsAxios } from '@/shared/api'

import { AxiosError, AxiosResponse } from 'axios'

import { URL_AUTH_REFRESH_TOKEN } from './constants'
import {
  PostAuthRefreshTokenRequest,
  PostAuthRefreshTokenResponse
} from './types'

export async function postAuthRefreshToken(
  refreshToken: PostAuthRefreshTokenRequest['refreshToken']
) {
  const response = await dtsAxios.post<
    PostAuthRefreshTokenRequest,
    AxiosResponse<PostAuthRefreshTokenResponse, AxiosError>
  >(URL_AUTH_REFRESH_TOKEN, { refreshToken })

  return response.data
}
