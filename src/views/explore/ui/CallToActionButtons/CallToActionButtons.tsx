'use client'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

import { Button } from '@/shared/ui/button'

interface CallToActionButtonsProps {
  onClickSeeExample?: () => void
}

export const CallToActionButtons = (props: CallToActionButtonsProps) => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  return (
    <div className="flex gap-3 justify-center h-[43px] mt-6 mb-[0.5rem]">
      {isAuth !== true ? (
        <>
          <Button onClick={() => router.push('/signup')}>
            Get Started for Free
          </Button>
          {props.onClickSeeExample ? (
            <Button variant="sub1" onClick={props.onClickSeeExample}>
              See Examples
            </Button>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
