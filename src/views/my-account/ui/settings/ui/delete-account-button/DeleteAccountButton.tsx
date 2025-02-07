'use client'

import { Button } from '@/shared/ui'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import { UI_TEXT } from '../../model/constants'
import { DeleteAccountModal } from './ui/DeleteAccountModal'

export const DeleteAccountButton = () => {
  const { openModal } = useModals()
  return (
    <Button
      variant="destructive"
      stretch
      onClick={() => openModal(DeleteAccountModal)}
    >
      {UI_TEXT.DELETE_ACCOUNT}
    </Button>
  )
}
