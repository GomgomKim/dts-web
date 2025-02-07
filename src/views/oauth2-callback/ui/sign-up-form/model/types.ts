import { PostSignUpRequest } from '@/views/oauth2-callback/model/types'

export type PostSignUpUserReqParams = Pick<PostSignUpRequest, 'name' | 'email'>
export type PostSignUpOAuthReqParams = PostSignUpUserReqParams &
  Pick<PostSignUpRequest, 'type' | 'socialToken'>
export type PostSignUpAgreeReqParams = Pick<
  PostSignUpRequest,
  'agreeMarketingTermsVer' | 'agreePrivacyTermsVer' | 'agreeTermsVer'
>
