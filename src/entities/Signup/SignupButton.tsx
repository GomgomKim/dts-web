'use client'

import { track } from '@/shared/lib/utils/mixpanel'
import { LoginButton } from '@/shared/ui/LoginButton/LoginButton'

export const SignupButton = () => {
  return (
    <LoginButton
      onClick={() => {
        track.sendToMixpanel('click_signup')
      }}
    >
      Sign up with google
    </LoginButton>
  )
}
