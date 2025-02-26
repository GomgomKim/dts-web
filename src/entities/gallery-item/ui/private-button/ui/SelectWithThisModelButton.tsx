import { ComponentProps } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'
import useModals from '@/shared/ui/modal/model/Modals.hooks'

import LinkIcon from '/public/icons/arrow-thin.svg'

import { PrivateButton } from '../PrivateButton'
import { UI_TEXT } from '../model/constants'
import { ConfirmSelectionModal } from './confirm-selection-modal'

type PrivateButtonProps = ComponentProps<typeof PrivateButton>

interface SelectWithThisModelButtonProps extends PrivateButtonProps {}

export const SelectWithThisModelButton = (
  props: SelectWithThisModelButtonProps
) => {
  const router = useRouter()
  const { openModal } = useModals()

  const { modelInfo } = props
  const { name, id } = modelInfo

  // MEMO: 하위에서 체크하는게 성능적으로 좋을지, 위에서 결과 내려주는게 나을지?
  // TODO: membership api 연결
  const modelIds = [123]
  const plan = 'MODEL_3'

  const handleClickButton = () => {
    // track.sendToMixpanel('select_model', {
    //   model_name: modelName,
    //   model_tag: tags.join(',')
    // })

    // 1. 활성화된 모델이면 페이지 이동
    if (modelIds.includes(id)) {
      router.push(`/generate/${name}?id=${id}`)
      return
    }
    // 2. 아니면 컨펌 모달 오픈
    openModal(ConfirmSelectionModal, {
      modelInfo,
      plan,
      subscribingModelCount: modelIds.length
    })
  }
  return (
    <Button
      variant="outline"
      size="small"
      {...props}
      onClick={handleClickButton}
    >
      {UI_TEXT.SELECT_THIS_MODEL}
      <LinkIcon className="ml-[2px] stroke-white" />
    </Button>
  )
}
