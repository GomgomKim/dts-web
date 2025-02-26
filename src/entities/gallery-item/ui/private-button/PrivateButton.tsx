import { ComponentProps } from 'react'

import { Button } from '@/shared/ui'

import { GetAccessButton, SelectWithThisModelButton } from './ui'

interface PrivateButtonProps extends ComponentProps<'button'> {
  modelName: string
  modelId: number
}

export const PrivateButton = (props: PrivateButtonProps) => {
  const isRemainingActivatableModel = true
  // TODO: 튜토리얼 . free일 때 처리
  const isFreePlan = false

  if (isFreePlan) return <Button {...props}>try with this model</Button>

  return isRemainingActivatableModel ? (
    <SelectWithThisModelButton {...props} />
  ) : (
    <GetAccessButton {...props} />
  )
}
