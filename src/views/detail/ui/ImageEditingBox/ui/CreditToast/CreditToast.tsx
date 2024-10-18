import { Button } from '@/shared/ui'

import AlertCircle from '/public/icons/alert-circle.svg'

interface CreditToastProps {
  onClickGotIt: () => void
}

export const CreditToast = (props: CreditToastProps) => {
  return (
    <div className="absolute bottom-6 p-2 flex items-center gap-5 bg-neutral-0 bg-opacity-90 rounded-[0.5rem] z-[50]">
      <div className="flex items-center">
        <div className="ml-[0.5rem] mr-[1rem]">
          <AlertCircle stroke="#FF8480" />
        </div>
        <div>
          <p className="text-[0.875rem] leading-[20px] font-bold">
            Out of credits!
          </p>
          <p className="text-[0.75rem] text-neutral-7 text-nowrap leading-[20px]">
            Try again tomorrow for a fresh start
          </p>
        </div>
      </div>
      <Button
        onClick={props.onClickGotIt}
        className="bg-white hover:bg-white text-black rounded-[0.5rem] font-semibold px-[1rem]"
      >
        Got It!
      </Button>
    </div>
  )
}
