import { Button } from '@/shared/ui'

import AlertCircle from '/public/icons/alert-circle.svg'

interface CreditToastProps {
  onClickGotIt: () => void
}

export const CreditToast = (props: CreditToastProps) => {
  return (
    <div className="absolute bottom-6 z-50 flex items-center gap-5 rounded-[0.5rem] bg-neutral-0/90 p-2">
      <div className="flex items-center">
        <div className="ml-2 mr-4">
          <AlertCircle stroke="#FF8480" />
        </div>
        <div>
          <p className="text-[0.875rem] font-bold leading-[20px]">
            Out of credits!
          </p>
          <p className="text-nowrap text-[0.75rem] leading-[20px] text-neutral-7">
            Try again tomorrow for a fresh start
          </p>
        </div>
      </div>
      <Button
        onClick={props.onClickGotIt}
        className="rounded-[0.5rem] bg-white px-4 font-semibold text-black hover:bg-white"
      >
        Got It!
      </Button>
    </div>
  )
}
