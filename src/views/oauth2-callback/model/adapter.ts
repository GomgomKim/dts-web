import { useMutation } from '@tanstack/react-query'

import { postSignIn, postSignUp } from './api'
import { PostSignInRequest, PostSignUpRequest } from './types'

export const usePostSignIn = () => {
  return useMutation({
    mutationFn: (postSignInReq: PostSignInRequest) => postSignIn(postSignInReq)
  })
}

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: (postSignUpReq: PostSignUpRequest) => postSignUp(postSignUpReq)
  })
}
