'use client'

import Link from 'next/link'
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
      withLogo
      title="Service Unavailable"
      description={
        <div className="text-[0.875rem]">
          An error occurred while processing your request. <br />
          Return to the homepage to log in again.
        </div>
      }
      footer={
        <>
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
          <div className="text-center">
            <Button
              variant="link"
              size="small"
              className="mt-3 text-white underline underline-offset-[3px]"
              asChild
            >
              <Link href="https://tally.so/r/314QEg" target="_blank">
                Feedback
              </Link>
            </Button>
          </div>
        </>
      }
    />
  )
}
