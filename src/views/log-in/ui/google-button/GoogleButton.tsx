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

      const redirectPath = `${targetPath}${props.redirectPageInfo ? `${getRedirectPath(props.redirectPageInfo)}` : ''}` // /generate/name?id=123
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

// 테스트용 데이터때문에 임시 작성 (ex. 테스트 모델1 -> 테스트모델1)
const getRedirectPath = (redirectPageInfo: string) => {
  return redirectPageInfo.replace(' ', '')
}
