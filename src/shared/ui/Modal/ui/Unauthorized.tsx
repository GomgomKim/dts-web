import Link from 'next/link'

import { Button } from '@/shared/ui'

import ArrowLeft from '/public/icons/arrow-thin.svg'

interface UnauthorizedProps {
  onClick: () => void
}

export const Unauthorized = (props: UnauthorizedProps) => {
  return (
    <div>
      <div className="mb-[2rem]">
        <div className="text-[24px] mb-3">Service Unavailable</div>
        <p className="text-neutral-7 text-[14px]">
          An error occurred while processing your request. Return to the
          homepage to log in again.
        </p>
      </div>

      <Button
        variant="destructive"
        className="py-[1rem]"
        stretch
        onClick={props.onClick}
      >
        <div className="flex items-center gap-[0.5rem]">
          <ArrowLeft className="stroke-black -rotate-[135deg]" />
          <span className="text-[0.75rem] font-semibold">
            Go Back Home to Log In
          </span>
        </div>
      </Button>

      <div className="mt-3 text-center">
        <Link
          href="https://tally.so/r/314QEg"
          target="_blank"
          className="text-[14px] underline underline-offset-4 p-3 inline-block text-center"
        >
          Feedback
        </Link>
      </div>
    </div>
  )
}
