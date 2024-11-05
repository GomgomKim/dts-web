import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/Modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/Modal/model/types'

interface GenerationLimitProps extends ModalComponentProps {}

export const GenerationLimit = (props: GenerationLimitProps) => {
  const { onCloseModal } = props

  return (
    <DefaultModal
      closeable={{ isCloseable: false, onClose: onCloseModal }}
      title="Generation Limit Reached for This Model"
      description={
        <>
          You’ve hit the 100-generation limit for this model. <br />
          To continue, please select another model.
        </>
      }
      slot={
        <Button
          variant="destructive"
          className="py-[1rem]"
          stretch
          onClick={onCloseModal}
        >
          <span className="text-[0.75rem] font-semibold">OK, Got It</span>
        </Button>
      }
    />
  )
}
GenerationLimit.displayName = 'GenerationLimit'
