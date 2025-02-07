import Link from 'next/link'

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

import { UI_TEXT } from '../../../model/constants'

export const ExpiringInNDaysCard = () => {
  return (
    <Card className="flex shrink-0 grow basis-[372px] flex-col md:h-auto md:w-[488px] lg:max-w-[556px]">
      <div className="flex grow flex-col justify-between">
        <CardHeader className="pr-5">
          <CardTitle>
            <h3>{UI_TEXT.EXPIRING_IN_7_DAYS}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pr-5 md:space-y-4">
          <div className="mb-2 text-right">
            <span className="!text-[2rem] md:!text-[2.5rem]">20</span>
            <span className="!text-neutral-7"> {UI_TEXT.CREDITS}</span>
          </div>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.IN_15_DAYS}</LabeledDetailLabel>
            <LabeledDetailDetail>
              0<span className="text-neutral-7"> {UI_TEXT.CREDITS}</span>
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.IN_30_DAYS}</LabeledDetailLabel>
            <LabeledDetailDetail>
              0<span className="text-neutral-7"> {UI_TEXT.CREDITS}</span>
            </LabeledDetailDetail>
          </LabeledDetail>
        </CardContent>
      </div>
      <CardFooter className="flex gap-5">
        <Button variant="outline" stretch asChild>
          <Link href="/my-account/credits-expiry">{UI_TEXT.VIEW_DETAILS}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
