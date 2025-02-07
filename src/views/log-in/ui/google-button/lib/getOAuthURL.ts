import { oauthCallbackPath, oauthPath } from './constants'

export type SignInType = 'google'

const getOAuthRedirectURL = (redirectPath: string) => {
  const redirectUrl = new URL(location.href)
  redirectUrl.pathname = oauthCallbackPath
  redirectUrl.searchParams.set('redirectPath', redirectPath)
  return redirectUrl
}

export const getOAuthURL = (oAuthType: SignInType, redirectPath: string) => {
  const origin = process.env.NEXT_PUBLIC_API_URL

  if (origin === undefined) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined')
  }

  const url = new URL(origin)
  url.pathname = oauthPath
  url.searchParams.set('type', oAuthType)
  const redirectUrl = getOAuthRedirectURL(redirectPath)
  url.searchParams.set('redirectUri', redirectUrl.href)

  return url
}
