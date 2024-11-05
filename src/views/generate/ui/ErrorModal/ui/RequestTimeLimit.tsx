import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/Modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/Modal/model/types'

interface RequestTimeLimitProps extends ModalComponentProps {}

export const RequestTimeLimit = (props: RequestTimeLimitProps) => {
  const { onCloseModal, onClose } = props

  const handleCloseModal = () => {
    onClose?.()
    onCloseModal()
  }

  return (
    <DefaultModal
      closeable={{ isClosable: true, onClose: onCloseModal }}
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
          Try Again Soon
        </Button>
      }
    />
  )
}
RequestTimeLimit.displayName = 'RequestTimeLimit'
