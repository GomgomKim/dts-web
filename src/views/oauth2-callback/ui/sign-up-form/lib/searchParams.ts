// TODO:
import { SignInType } from '@/views/log-in/ui/google-button/lib/getOAuthURL'

import { PostSignUpUserReqParams } from '../model/types'

export const extractOAuthTypeParam = (param: string): SignInType | false =>
  param === 'google' ? param : false

export const extractUserInfoParams = (
  param: string
): PostSignUpUserReqParams | false => {
  try {
    const { name, email } = JSON.parse(param)

    if (typeof name === 'string' && typeof email === 'string') {
      return { name, email }
    }

    return false
  } catch (e) {
    return false
  }
}
