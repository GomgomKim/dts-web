'use client'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { Button } from '@/shared/ui/button'

interface CallToActionButtonsProps {
  onClickSeeExample?: () => void
}

export const CallToActionButtons = (props: CallToActionButtonsProps) => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  return (
    <div className="mb-2 mt-6 flex h-[41px] justify-center gap-3">
      {isAuth !== true ? (
        <>
          <Button onClick={() => router.push('/signup')}>
            Get Started for Free
          </Button>
          {props.onClickSeeExample ? (
            <Button variant="outline" onClick={props.onClickSeeExample}>
              See Examples
            </Button>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
