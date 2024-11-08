'use client'

import { track } from '@/shared/lib/utils/mixpanel'
import { GoogleButton } from '@/shared/ui/GoogleButton/GoogleButton'

interface SignupButtonProps {
  redirectPageInfo?: string
}

export const SignupButton = (props: SignupButtonProps) => {
  return (
    <GoogleButton
      redirectPageInfo={props.redirectPageInfo}
      onClick={() => {
        track.sendToMixpanel('click_signup')
      }}
    >
      Sign up with google
    </GoogleButton>
  )
}
