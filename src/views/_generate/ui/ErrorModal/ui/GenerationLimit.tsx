import Link from 'next/link'

import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

interface GenerationLimitProps extends ModalComponentProps {}

export const GenerationLimit = (props: GenerationLimitProps) => {
  const { onCloseModal } = props

  return (
    <DefaultModal
      withLogo
      closeable={{
        isCloseable: false,
        onClose: onCloseModal,
        withCancel: false
      }}
      title="Generation Limit Reached for This Model"
      description={
        <>
          You’ve hit the 100-generation limit for this model. <br />
          To continue, please select another model.
        </>
      }
      footer={
        <>
          <Button
            variant="destructive"
            className="py-4"
            stretch
            onClick={onCloseModal}
          >
            <span className="text-[0.75rem] font-semibold">OK, Got It</span>
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
    />
  )
}
GenerationLimit.displayName = 'GenerationLimit'
