import { ComponentProps } from 'react'

import { MainItem } from '@/shared/api/types'

import { UI_TEXT } from './model/constants'
import { ActivableModelButton, GetAccessButton } from './ui'

interface PrivateButtonProps extends ComponentProps<'button'> {
  modelInfo: MainItem
}

export const PrivateButton = (props: PrivateButtonProps) => {
  // TODO: membership api 연결
  const isRemainingActivableModel = true
  const isFreePlan = false

  if (isFreePlan)
    return (
      <ActivableModelButton {...props}>
        {UI_TEXT.TRY_WITH_THIS_MODEL}
      </ActivableModelButton>
    )

  if (isRemainingActivableModel)
    return (
      <ActivableModelButton {...props}>
        {UI_TEXT.SELECT_THIS_MODEL}
      </ActivableModelButton>
    )

  return <GetAccessButton {...props} />
}
