import { Tokens } from '@/shared/api/types'

//
type PostSignUpType = 'google'

export interface PostSignUpRequest {
  type: PostSignUpType
  email: string
  name: string
  agreeTermsVer: string
  agreePrivacyTermsVer: string
  agreeMarketingTermsVer?: string
  socialToken: string
  codeToken?: string
  isMobile?: string
}

export type PostSignUpResponse = Tokens

//
export type PostSignInRequest = { token: string; isMobile: boolean }
export type PostSignInResponse = Tokens
