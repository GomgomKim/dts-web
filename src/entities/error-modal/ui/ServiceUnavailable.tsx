import { Button } from '@/shared/ui'

import AlertIcon from '/public/icons/alert-circle.svg'

import { DefaultModal } from '../../../shared/ui/modal/DefaultModal'

interface ServiceUnavailableProps {
  onClickButton: () => void
}

export const ServiceUnavailable = (props: ServiceUnavailableProps) => {
  const { onClickButton } = props

  return (
    <DefaultModal
      title="Service Unavailable"
      description="An error occurred while processing your request. Please refresh the
            page to try again."
      slot={
        <Button
          variant="destructive"
          className="py-4"
          stretch
          onClick={onClickButton}
        >
          <div className="flex items-center gap-2">
            <AlertIcon className="stroke-black" />
            <span className="text-[0.875rem] font-semibold">Try Again</span>
          </div>
        </Button>
      }
    ></DefaultModal>
  )
}
