import { Button } from '@/shared/ui'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'

import CreditCardIcon from '/public/icons/credit-card.svg'

import { UI_TEXT } from '../../model/constants'

export const PaymentMethods = () => {
  return (
    <Card className="flex h-[301px] max-w-[588px] flex-1 shrink-0 basis-[460px] flex-col">
      <div className="flex grow flex-col justify-between">
        <CardHeader className="pr-5">
          <CardTitle className="flex items-center gap-3">
            <CreditCardIcon />
            {UI_TEXT.PAYMENT_METHODS}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pr-5">
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.CREDIT_CARD}</LabeledDetailLabel>
            <LabeledDetailDetail>Visa **** 1234</LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.EXPIRES}</LabeledDetailLabel>
            <LabeledDetailDetail>10 / 2029</LabeledDetailDetail>
          </LabeledDetail>
        </CardContent>
      </div>
      <CardFooter className="flex gap-5">
        <Button variant="outline" stretch>
          {UI_TEXT.UPDATE_PAYMENT_METHOD}
        </Button>
      </CardFooter>
    </Card>
  )
}
