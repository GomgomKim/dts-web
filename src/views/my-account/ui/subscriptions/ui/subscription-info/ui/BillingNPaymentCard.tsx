import Link from 'next/link'

import { Button } from '@/shared/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/card'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'

import { UI_TEXT } from '../../../model/constants'

interface BillingNPaymentCardProps {
  isSubscribing: boolean
}

export const BillingNPaymentCard = (props: BillingNPaymentCardProps) => {
  return (
    <Card className="flex flex-1 flex-col">
      <div className="flex grow flex-col justify-between">
        <CardHeader className="pr-5">
          <CardTitle>
            {UI_TEXT.BILLING} & {UI_TEXT.PAYMENT}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pr-5">
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.PRICE}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <>{props.isSubscribing ? '$100 for 1 Model' : '-'}</>
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.BILLING_PERIOD}</LabeledDetailLabel>
            <LabeledDetailDetail>
              {props.isSubscribing ? 'Monthly' : '-'}
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.RENEWAL_DATE}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <>
                {props.isSubscribing
                  ? UI_TEXT.RENEWS_ON + '2024. 12. 25'
                  : UI_TEXT.SUBSCRIPTION_EXPIRED}
              </>
            </LabeledDetailDetail>
          </LabeledDetail>
          <CardDescription className="mt-3 text-end">
            <>
              {props.isSubscribing
                ? UI_TEXT.RENEWS_AUTOMATICALLY
                : UI_TEXT.YOUR_SUBSCRIPTION_EXPIRED_ON + ' ' + '2024. 12. 12'}
            </>
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter className="flex gap-5">
        <Button variant="outline" stretch asChild>
          <Link href="/my-account/manage-subscription">
            {UI_TEXT.MANAGE_SUBSCRIPTION}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
