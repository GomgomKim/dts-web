import { ComponentProps } from 'react'

import { Button } from '@/shared/ui'

import { UI_TEXT } from '../model/constants'

interface AddCreditsContinueButtonProps extends ComponentProps<'button'> {
  isSelectedCredit: boolean
}

export const AddCreditsContinueButton = (
  props: AddCreditsContinueButtonProps
) => {
  return (
    <Button
      variant="primary"
      className={props.className}
      stretch
      type="submit"
      form="add-credits"
      disabled={!props.isSelectedCredit}
    >
      {props.isSelectedCredit ? UI_TEXT.CONTINUE : UI_TEXT.SELECT_AN_AMOUNT}
    </Button>
  )
}
