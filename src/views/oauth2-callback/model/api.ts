import { dtsAxios } from '@/shared/api'

import { URL_AUTH_REGISTER, URL_AUTH_SOCIAL } from './constants'
import {
  PostSignInRequest,
  PostSignInResponse,
  PostSignUpRequest,
  PostSignUpResponse
} from './types'

const MAX_NAME_LENGTH = 20

export const postSignIn = async (postSignInReq: PostSignInRequest) => {
  try {
    const response = await dtsAxios.post<PostSignInResponse>(
      URL_AUTH_SOCIAL,
      postSignInReq
    )

    return response.data
  } catch (e) {
    console.error('postSignIn error' + e)
  }
}

export const postSignUp = async (data: PostSignUpRequest) => {
  try {
    const response = await dtsAxios.post<PostSignUpResponse>(
      URL_AUTH_REGISTER,
      {
        ...data,
        name: data.name.slice(0, MAX_NAME_LENGTH)
      }
    )

    return response.data
  } catch (e) {
    console.error('postSignUp error' + e)
  }
}
