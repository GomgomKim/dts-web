'use client'

import { UI_TEXT } from '@/views/my-account/ui/credits/model/constants'

import { Button } from '@/shared/ui'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { AddCreditsModal } from './ui'

export const AddCreditsButton = () => {
  const { openModal } = useModals()

  return (
    <Button
      variant="primary"
      stretch
      className="text-[0.875rem] md:text-[1rem]"
      onClick={() => openModal(AddCreditsModal)}
    >
      {UI_TEXT.ADD_CREDITS}
    </Button>
  )
}
