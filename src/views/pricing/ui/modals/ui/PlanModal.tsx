'use client'

import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'

import { UI_TEXT } from '../constants'

interface PlanModalProps {
  title: string
  description: React.ReactNode
  children: React.ReactNode
  actionButtonTitle?: string
  onClickActionButton: () => void
  onCloseModal: () => void
}

export const PlanModal = (props: PlanModalProps) => {
  return (
    <DefaultModal
      className="w-full max-w-[560px]"
      closeable={{
        isCloseable: true,
        onClose: props.onCloseModal,
        withCancel: true
      }}
      title={props.title}
      description={props.description}
      footer={
        <Button
          stretch
          className="bg-white font-semibold hover:bg-white"
          onClick={() => props.onClickActionButton()}
        >
          {props.actionButtonTitle ? props.actionButtonTitle : UI_TEXT.CONTINUE}
        </Button>
      }
    >
      {props.children}
    </DefaultModal>
  )
}
