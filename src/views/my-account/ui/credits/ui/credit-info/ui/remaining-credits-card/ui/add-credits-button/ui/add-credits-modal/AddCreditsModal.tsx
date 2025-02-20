'use client'

import { useState } from 'react'

import { AddCreditsContinueButton } from '@/features/add-credits/ui'
import { AddCreditsForm } from '@/features/add-credits/ui/AddCreditsForm'

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
        <AddCreditsContinueButton
          className="bg-white text-[0.875rem] hover:bg-white md:text-[1rem]"
          isSelectedCredit={isSelectedCredit}
        />
      }
    >
      <AddCreditsForm
        toggleIsSelectedCredit={(value: boolean) => setIsSelectedCredit(value)}
      />
    </DefaultModal>
  )
}
