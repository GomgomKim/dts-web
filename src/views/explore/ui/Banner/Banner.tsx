'use client'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

import { Button } from '@/shared/ui/button'

interface BannerProps {
  onClickSeeExample?: () => void
}

export const Banner = (props: BannerProps) => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const router = useRouter()

  const handleClickStart = () => {
    router.push('/signup')
  }

  return (
    <div className="flex flex-col gap-6 text-center mb-[0.5rem]">
      <div className="font-semibold text-[32px]">
        Create stunning virtual brand models effortlessly <br />
        with our advanced AI
      </div>
      <div className="text-medium text-neutral-5">
        Enhance your brands presence with lifelike, customizable models
        generated in seconds
      </div>
      <div className="flex gap-3 justify-center h-[43px]">
        {isAuth !== true ? (
          <>
            <Button onClick={handleClickStart}>Get Started for Free</Button>
            {props.onClickSeeExample ? (
              <Button variant="outline" onClick={props.onClickSeeExample}>
                See Examples
              </Button>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}
