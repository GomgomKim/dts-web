import Image from 'next/image'

import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { MainItem } from '@/shared/api/types'
import { getImageUrl } from '@/shared/lib/utils/getImageUrl'
import { Button } from '@/shared/ui'
import { DefaultModal } from '@/shared/ui/modal/DefaultModal'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

import { UI_TEXT } from './model/constants'

interface ConfirmSelectionModalProps extends ModalComponentProps {
  modelInfo: MainItem
  plan: string
  subscribingModelCount: number
}

export const ConfirmSelectionModal = (props: ConfirmSelectionModalProps) => {
  const { onCloseModal } = props

  const handleClickConfirm = () => {
    alert('confirm')
  }

  const imgUrl = getImageUrl(props.modelInfo.encryptedThumbnailPath)

  return (
    <DefaultModal
      title={UI_TEXT.CONFIRM_YOUR_SELECTION}
      // TODO: 모달 description 기본 폰트 크기(14 to 16) 바꾸기
      description={UI_TEXT.CONFIRM_YOUR_SELECTION_DESCRIPTION}
      footer={
        <Button
          variant="primary"
          className="bg-white hover:bg-white"
          stretch
          onClick={handleClickConfirm}
        >
          Confirm
        </Button>
      }
      closeable={{
        isCloseable: true,
        onClose: onCloseModal,
        withCancel: true
      }}
      className="w-[560px]"
    >
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square w-[120px] overflow-hidden rounded-[0.5rem]">
          <Image
            src={imgUrl}
            alt={props.modelInfo.name}
            fill
            className="bg-neutral-5"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex gap-2 rounded-[0.5rem] bg-neutral-1 p-5">
          <span className="w-[64px] font-medium text-neutral-7">
            {UI_TEXT.MODEL}
          </span>
          <span>{props.modelInfo.name}</span>
        </div>
        <div className="flex gap-2 rounded-[0.5rem] bg-neutral-1 p-5">
          <div className="w-[64px] font-medium text-neutral-7">
            {UI_TEXT.PLAN}
          </div>
          <div>
            <p className="text-nowrap text-[1.125rem] font-medium text-primary">
              {props.subscribingModelCount + 1} /{' '}
              {PLAN_NAME_TITLE_MAP[props.plan]} {UI_TEXT.PLAN}
            </p>
            <p className="mt-4 font-medium text-neutral-7">
              *{UI_TEXT.PLAN_DESCRIPTION}
            </p>
          </div>
        </div>
        {/* TODO: features  */}
        {props.modelInfo.features.length < 0 ? (
          <div className="font-medium text-destructive">
            *{props.modelInfo.features.join(', ')}{' '}
            {UI_TEXT.FEATURES_DESCRIPTION}
          </div>
        ) : null}
      </div>
    </DefaultModal>
  )
}
