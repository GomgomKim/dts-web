'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/Modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/Modal/model/types'

import ArrowLeft from '/public/icons/arrow-thin.svg'

interface GenerationLimitProps extends ModalComponentProps {}

export const GenerationLimit = (props: GenerationLimitProps) => {
  const router = useRouter()

  const { onCloseModal } = props

  const handleCloseModal = () => {
    onCloseModal()
    router.push('/explore')
  }

  return (
    <DefaultModal
      closable={{ isClosable: true, onClose: onCloseModal }}
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
          onClick={handleCloseModal}
        >
          <div className="flex items-center gap-[0.5rem]">
            <ArrowLeft className="stroke-black -rotate-[135deg]" />
            <span className="text-[0.75rem] font-semibold">
              Go to Explore to Select Another Model
            </span>
          </div>
        </Button>
      }
    />
  )
}
GenerationLimit.displayName = 'GenerationLimit'
