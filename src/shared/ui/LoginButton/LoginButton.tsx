'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

import GoogleIcon from '/public/icons/google-logo.svg'

export const LoginButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const handleClick = () => {
    const loginUrl = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL
    if (loginUrl) {
      router.replace(loginUrl)
    } else {
      console.error('Google login URL is not defined')
    }
  }

  return (
    <Button className="bg-white relative hover:bg-white" onClick={handleClick}>
      <span className="absolute left-[20px]">
        <GoogleIcon />
      </span>
      {children}
    </Button>
  )
}
