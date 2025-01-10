'use client'

import { Button } from '@/shared/ui'
import { Modal } from '@/shared/ui/modal/Modal'

import { UI_TEXT } from '../constants'

interface PlanModalProps {
  title: string
  description: string
  children: React.ReactNode
  actionButtonTitle?: string
  onClickActionButton: () => void
  onCloseModal: () => void
}

export const PlanModal = (props: PlanModalProps) => {
  return (
    <Modal onCloseModal={props.onCloseModal} className="max-w-[560px]">
      <header className="mb-3 text-[1.5rem] font-semibold">
        {props.title}
      </header>
      <p className="mb-8 text-neutral-7">{props.description}</p>

      {/* Contents */}
      {props.children}

      {/* Actions */}
      <Button
        stretch
        className="mb-3 mt-8 bg-white font-semibold hover:bg-white"
        onClick={() => props.onClickActionButton()}
      >
        {props.actionButtonTitle ? props.actionButtonTitle : UI_TEXT.CONTINUE}
      </Button>
      {/* close modal */}
      <div className="text-center">
        <Button
          variant="link"
          size="small"
          className="text-white underline"
          onClick={props.onCloseModal}
        >
          {UI_TEXT.CANCEL}
        </Button>
      </div>
    </Modal>
  )
}
