import Link from 'next/link'

import { Button } from '@/shared/ui'

import AlertIcon from '/public/icons/alert-circle.svg'

interface ServiceUnavailableProps {
  onClick: () => void
}

export const ServiceUnavailable = (props: ServiceUnavailableProps) => {
  return (
    <div>
      <div className="mb-[2rem]">
        <div className="text-[24px] mb-3">Service Unavailable</div>
        <p className="text-neutral-7 text-[14px]">
          An error occurred while processing your request. Please refresh the
          page to try again.
        </p>
      </div>

      <Button
        variant="destructive"
        className="py-[1rem]"
        stretch
        onClick={props.onClick}
      >
        <div className="flex items-center gap-[0.5rem]">
          <AlertIcon className="stroke-black" />
          <span className="text-[0.875rem] font-semibold">Try Again</span>
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
