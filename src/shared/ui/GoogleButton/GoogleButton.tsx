'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

import GoogleIcon from '/public/icons/google-logo.svg'

interface GoogleButtonProps {
  children: React.ReactNode
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
      const redirectUri =
        redirectBaseUrl +
        (props.redirectPageInfo ? '/generate' : '/explore') +
        '?oAuthProviderType=GOOGLE'

      const redirectState = props.redirectPageInfo
        ? getState(props.redirectPageInfo)
        : ''

      const replaceHref =
        loginUrl +
        '&redirect_uri=' +
        redirectUri +
        (redirectState ? '&state=' + redirectState : '')

      router.replace(replaceHref)
    } else {
      console.error('Google login URL is not defined')
    }
  }

  return (
    <Button className="relative bg-white hover:bg-white" onClick={handleClick}>
      <span className="absolute left-[20px]">
        <GoogleIcon />
      </span>
      {props.children}
    </Button>
  )
}

const getState = (redirectPageInfo: string) => {
  return redirectPageInfo.replaceAll('=', '-').replace('&', '-')
}
