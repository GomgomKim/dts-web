import Link from 'next/link'

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
      withLogo
      title="Service Unavailable"
      description="An error occurred while processing your request. Please refresh the
            page to try again."
      footer={
        <>
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
    ></DefaultModal>
  )
}
