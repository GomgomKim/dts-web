'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

import GoogleIcon from '/public/icons/google-logo.svg'

import { getOAuthURL } from './lib/getOAuthURL'

interface GoogleButtonProps {
  onClick?: () => void
  redirectPageInfo?: string
}

export const GoogleButton = (props: GoogleButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    const loginUrl = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL
    const redirectBaseUrl = process.env.NEXT_PUBLIC_REDIRECT_BASE_URL

    props.onClick?.()

    if (loginUrl && redirectBaseUrl) {
      const targetPath = props.redirectPageInfo ? '/generate' : '/explore'
      const redirectState = props.redirectPageInfo
        ? getState(props.redirectPageInfo)
        : ''

      const redirectSearchParam = redirectState ? '&state=' + redirectState : ''
      const redirectPath = `${targetPath}${redirectSearchParam ? `?${redirectSearchParam}` : ''}`
      const oAuthUrl = getOAuthURL('google', redirectPath)
      router.replace(oAuthUrl.href)
    } else {
      console.error('Google login URL is not defined')
    }
  }

  return (
    <Button
      className="relative bg-white text-[0.875rem] hover:bg-white"
      onClick={handleClick}
      stretch
    >
      <span className="absolute left-[20px]">
        <GoogleIcon />
      </span>
      Continue with Google
    </Button>
  )
}

// 구글 로그인 후 리다이렉트 될 모델 generate 페이지 정보(name, id) 전달
const getState = (redirectPageInfo: string) => {
  return redirectPageInfo.replaceAll('=', '-').replace('&', '-')
}
