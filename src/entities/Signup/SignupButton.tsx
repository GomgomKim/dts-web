'use client'

import sendToMixpanel from '@/shared/lib/utils/sendToMixpanel'
import { LoginButton } from '@/shared/ui/LoginButton/LoginButton'

export const SignupButton = () => {
  return (
    <LoginButton
      onClick={() => {
        sendToMixpanel('click_signup')
      }}
    >
      Sign up with google
    </LoginButton>
  )
}
