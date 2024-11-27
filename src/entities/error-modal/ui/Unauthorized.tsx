'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

import ArrowLeft from '/public/icons/arrow-thin.svg'

import { DefaultModal } from '../../../shared/ui/modal/DefaultModal'

interface UnauthorizedProps {
  onClickButton: () => void
}

export const Unauthorized = (props: UnauthorizedProps) => {
  const { onClickButton } = props

  const router = useRouter()

  return (
    <DefaultModal
      title="Service Unavailable"
      description="An error occurred while processing your request. Return to the
            homepage to log in again."
      slot={
        <Button
          variant="destructive"
          className="py-4"
          stretch
          onClick={() => {
            onClickButton()
            router.replace('/')
          }}
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="rotate-[225deg] stroke-black" />
            <span className="text-[0.75rem] font-semibold">
              Go Back Home to Log In
            </span>
          </div>
        </Button>
      }
    />
  )
}
