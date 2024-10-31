import Link from 'next/link'

import { Button } from '@/shared/ui'

import ArrowLeft from '/public/icons/arrow-thin.svg'

interface GenerationLimitProps {
  onClick: () => void
}

export const GenerationLimit = (props: GenerationLimitProps) => {
  return (
    <div>
      <div className="mb-[2rem]">
        <div className="text-[24px] mb-3">
          Generation Limit Reached for This Model
        </div>
        <p className="text-neutral-7 text-[14px]">
          You’ve hit the 100-generation limit for this model. <br />
          To continue, please select another model.
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
            Go to Explore to Select Another Model
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
