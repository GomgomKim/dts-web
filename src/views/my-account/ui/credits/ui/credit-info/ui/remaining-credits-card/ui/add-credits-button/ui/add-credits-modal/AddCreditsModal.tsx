'use client'

import { useState } from 'react'

import { AddCreditsForm } from '@/features/add-credits/AddCreditsForm'

import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

interface AddCreditsModalProps extends ModalComponentProps {}

export const AddCreditsModal = (props: AddCreditsModalProps) => {
  const { onCloseModal } = props

  const [isSelectedCredit, setIsSelectedCredit] = useState<boolean>(false)

  return (
    <DefaultModal
      className="w-[560px]"
      closeable={{
        isCloseable: true,
        onClose: onCloseModal,
        withCancel: true
      }}
      title="Add Credits"
      description="Select the number of credits to add instantly."
      footer={
        <Button
          type="submit"
          variant="primary"
          stretch
          className="bg-white text-[0.875rem] hover:bg-white md:text-[1rem]"
          disabled={!isSelectedCredit}
          form="add-credits"
        >
          {isSelectedCredit ? 'Continue' : 'Select an amount'}
        </Button>
      }
    >
      <AddCreditsForm
        toggleIsSelectedCredit={(value: boolean) => setIsSelectedCredit(value)}
      />
    </DefaultModal>
  )
}
