import Image from 'next/image'

import {
  PLAN_NAME_TITLE_MAP,
  PlanName
} from '@/views/pricing/ui/plan-Items/model/types'

import { MainItem } from '@/shared/api/types'
import { getImageUrl } from '@/shared/lib/utils/getImageUrl'
import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { UI_TEXT } from './model/constants'

interface ConfirmSelectionModalProps extends ModalComponentProps {
  isCloseable: boolean
  onClickCancel?: () => void
  modelInfo: MainItem
  plan: PlanName
  subscribingModelCount: number // TODO: modal 내에서 membership data 가져오기
}

export const ConfirmSelectionModal = (props: ConfirmSelectionModalProps) => {
  const { onCloseModal } = props

  const handleClickConfirm = () => {
    // TODO: api 연결
    alert('confirm')
  }

  const imgUrl = getImageUrl(props.modelInfo.encryptedThumbnailPath)

  const isFreePlan = props.plan === 'FREE'

  const modalDescription = isFreePlan
    ? UI_TEXT.FREE_PLAN_DESCRIPTION
    : UI_TEXT.CONFIRM_YOUR_SELECTION_DESCRIPTION
  const plan = isFreePlan ? (
    UI_TEXT.TUTORIAL
  ) : (
    <>
      {props.subscribingModelCount + 1} / {PLAN_NAME_TITLE_MAP[props.plan]}{' '}
      {UI_TEXT.PLAN}
    </>
  )

  return (
    <DefaultModal
      title={UI_TEXT.CONFIRM_YOUR_SELECTION}
      description={modalDescription}
      footer={
        <>
          <Button
            variant="primary"
            className="bg-white hover:bg-white"
            stretch
            onClick={handleClickConfirm}
          >
            {UI_TEXT.CONFIRM}
          </Button>
          <div className="text-center">
            <Button
              variant="link"
              size="small"
              className="mt-3 text-white underline underline-offset-[3px]"
              onClick={() => {
                props.onClickCancel?.()
                onCloseModal()
              }}
            >
              {UI_TEXT.CANCEL}
            </Button>
          </div>
        </>
      }
      closeable={{
        isCloseable: props.isCloseable,
        onClose: onCloseModal,
        withCancel: false
      }}
      className="w-[560px]"
    >
      <div className="flex flex-col gap-3">
        {/* image */}
        <div className="relative aspect-square w-[120px] overflow-hidden rounded-[0.5rem]">
          <Image
            src={imgUrl}
            alt={props.modelInfo.name}
            fill
            className="bg-neutral-5"
            style={{ objectFit: 'cover' }}
          />
        </div>
        {/* model */}
        <div className="flex gap-2 rounded-[0.5rem] bg-neutral-1 p-5">
          <span className="shrink-0 basis-[64px] font-medium text-neutral-7">
            {UI_TEXT.MODEL}
          </span>
          <span>{props.modelInfo.name}</span>
        </div>
        {/* plan */}
        <div className="flex gap-2 rounded-[0.5rem] bg-neutral-1 p-5">
          <div className="shrink-0 basis-[64px] font-medium text-neutral-7">
            {UI_TEXT.PLAN}
          </div>
          <div>
            <p className="text-nowrap text-[1.125rem] font-medium text-primary">
              {plan}
            </p>
            {isFreePlan ? null : (
              <p className="mt-4 font-medium text-neutral-7">
                *{UI_TEXT.PLAN_DESCRIPTION}
              </p>
            )}
          </div>
        </div>
        {/* TODO: features  */}
        {!isFreePlan && props.modelInfo.features.length > 0 ? (
          <div className="font-medium text-destructive">
            *{props.modelInfo.features.join(', ')}{' '}
            {UI_TEXT.FEATURES_DESCRIPTION}
          </div>
        ) : null}
      </div>
    </DefaultModal>
  )
}
