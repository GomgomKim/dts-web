import Link from 'next/link'

import { Button } from '@/shared/ui'

interface RequestTimeLimitProps {
  onClick: () => void
}

export const RequestTimeLimit = (props: RequestTimeLimitProps) => {
  return (
    <div>
      <div className="mb-[2rem]">
        <div className="text-[24px] mb-3">Take a Coffee Break!☕️</div>
        <p className="text-neutral-7 text-[14px]">
          Too many requests too fast! <br />
          Give us a sec to catch up, and we’ll be ready soon.
        </p>
      </div>

      <Button
        className="py-[1rem] bg-white hover:bg-white"
        stretch
        onClick={props.onClick}
      >
        Try Again Soon
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
