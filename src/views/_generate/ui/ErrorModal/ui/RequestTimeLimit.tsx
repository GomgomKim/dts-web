import Link from 'next/link'

import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

interface RequestTimeLimitProps extends ModalComponentProps {
  onClickSlot: () => void
}

export const RequestTimeLimit = (props: RequestTimeLimitProps) => {
  const { onCloseModal, onClickSlot } = props

  const handleCloseModal = () => {
    onClickSlot()
    onCloseModal()
  }

  return (
    <DefaultModal
      withLogo
      closeable={{
        isCloseable: false,
        onClose: onCloseModal,
        withCancel: false
      }}
      title="Take a Coffee Break!☕️"
      description={
        <div className="text-[0.75rem]">
          Too many requests too fast! <br />
          Give us a sec to catch up, and we’ll be ready soon.
        </div>
      }
      footer={
        <>
          <Button
            className="bg-white py-4 hover:bg-white"
            stretch
            onClick={handleCloseModal}
          >
            <span className="text-[0.75rem] font-semibold">Try Again Soon</span>
          </Button>{' '}
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
RequestTimeLimit.displayName = 'RequestTimeLimit'
