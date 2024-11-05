import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/Modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/Modal/model/types'

interface RequestTimeLimitProps extends ModalComponentProps {}

export const RequestTimeLimit = (props: RequestTimeLimitProps) => {
  const { onCloseModal, onClickSlot } = props

  const handleCloseModal = () => {
    onClickSlot()
    onCloseModal()
  }

  return (
    <DefaultModal
      closeable={{ isCloseable: false, onClose: onCloseModal }}
      title="Take a Coffee Break!☕️"
      description={
        <>
          Too many requests too fast! <br />
          Give us a sec to catch up, and we’ll be ready soon.
        </>
      }
      slot={
        <Button
          className="py-[1rem] bg-white hover:bg-white"
          stretch
          onClick={handleCloseModal}
        >
          <span className="font-semibold text-[0.75rem]">Try Again Soon</span>
        </Button>
      }
    />
  )
}
RequestTimeLimit.displayName = 'RequestTimeLimit'
