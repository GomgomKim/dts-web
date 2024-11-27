import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

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
          className="bg-white py-4 hover:bg-white"
          stretch
          onClick={handleCloseModal}
        >
          <span className="text-[0.75rem] font-semibold">Try Again Soon</span>
        </Button>
      }
    />
  )
}
RequestTimeLimit.displayName = 'RequestTimeLimit'
