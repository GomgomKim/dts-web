'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import useToggle from '@/shared/lib/hooks/useToggle'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { isAxiosError } from 'axios'

import { usePostSignIn, usePostSignUp } from './model/adapter'
import { PATH_PARAM_ERROR, UNKNOWN_ERROR } from './model/constants'
import { PostSignUpRequest } from './model/types'
import { PostSignUpFormValues } from './ui/sign-up-form'
import SignUpForm from './ui/sign-up-form/SignUpForm'
import {
  extractOAuthTypeParam,
  extractUserInfoParams
} from './ui/sign-up-form/lib/searchParams'
import { PostSignUpOAuthReqParams } from './ui/sign-up-form/model/types'

export default function OAuth2Callback() {
  const showSignUpFormToggle = useToggle(false)
  const [postSignUpOAuthReqParams, setPostSignUpOAuthReqParams] = useState<
    (PostSignUpOAuthReqParams & { redirectPath: string }) | null
  >(null)
  const authStore = useAuthStore()
  const router = useRouter()

  const postSignInMutation = usePostSignIn()
  const postSignUpMutation = usePostSignUp()

  const handleErrorMessage = (errorMessage: string) => {
    window.alert(errorMessage)
  }

  const throwIfNotAxiosError = (e: unknown) => {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error(UNKNOWN_ERROR)
    }
  }

  const signUp = async (signUpReq: PostSignUpRequest) => {
    try {
      const tokens = await postSignUpMutation.mutateAsync(signUpReq)
      return tokens
    } catch (e) {
      if (isAxiosError(e)) {
        throw new Error(
          e.response?.data.message ||
            e.response?.statusText ||
            'POST signUp unknown axios error'
        )
      } else {
        throwIfNotAxiosError(e)
      }
    }
  }

  const signIn = async (socialToken: string) => {
    try {
      const tokens = await postSignInMutation.mutateAsync({
        token: socialToken,
        isMobile: false
      })
      return tokens
    } catch (e) {
      if (isAxiosError(e)) {
        const isNotSignedUpUser = e.status === 401
        if (isNotSignedUpUser) {
          return false
        } else {
          throw new Error(
            e.response?.data.message ||
              e.response?.statusText ||
              'POST signIn unknown axios error'
          )
        }
      } else {
        throwIfNotAxiosError(e)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { searchParams } = new URL(window.location.href)
        const { token, redirectPath, type, user } = Object.fromEntries(
          searchParams.entries()
        )

        const oAuthTypeParam = extractOAuthTypeParam(type)
        const userInfoParams = extractUserInfoParams(user)

        if (
          token === undefined ||
          redirectPath === undefined ||
          oAuthTypeParam === false ||
          userInfoParams === false
        ) {
          throw new Error(PATH_PARAM_ERROR)
        }

        const postSignUpOAuthReqParams = {
          type: oAuthTypeParam,
          ...userInfoParams,
          socialToken: token,
          redirectPath
        }

        setPostSignUpOAuthReqParams(postSignUpOAuthReqParams)

        const tokens = await signIn(token)

        if (tokens) {
          authStore.logIn(tokens)
          window.alert(redirectPath)
          router.replace(decodeURIComponent(redirectPath))
        } else {
          showSignUpFormToggle.on()
        }
      } catch (e) {
        handleErrorMessage(e instanceof Error ? e.message : UNKNOWN_ERROR)
      }
    })()
  }, [])

  const handleSubmitSignUp = async (signUpFormValues: PostSignUpFormValues) => {
    try {
      if (!postSignUpOAuthReqParams) return
      const tokens = await signUp(signUpFormValues)
      if (tokens) {
        authStore.logIn(tokens)
        router.replace(
          decodeURIComponent(postSignUpOAuthReqParams.redirectPath)
        )
      }
    } catch (e) {
      handleErrorMessage(e instanceof Error ? e.message : UNKNOWN_ERROR)
    }
  }

  if (!showSignUpFormToggle.state) {
    return null
  }

  if (postSignUpOAuthReqParams === null) return null

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <SignUpForm
        postSignUpOAuthReqParams={postSignUpOAuthReqParams}
        onSubmit={handleSubmitSignUp}
        isSignUpPending={postSignUpMutation.isPending}
      />
    </div>
  )
}
