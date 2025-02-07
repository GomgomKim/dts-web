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

import { UI_TEXT } from '../../../../model/constants'
import { AddCreditsButton } from './ui/add-credits-button'

export const RemainingCreditsCard = () => {
  return (
    <Card className="flex h-[280px] shrink-0 grow basis-[372px] flex-col md:h-[292px] md:w-[488px] lg:max-w-[556px]">
      <div className="flex grow flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <h3>{UI_TEXT.REMAINING_CREDITS}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pr-5 md:space-y-4">
          <div className="mb-2 text-right">
            <span className="!text-[2rem] md:!text-[2.5rem]">20</span>
            <span className="!text-neutral-7"> / 100 {UI_TEXT.CREDITS}</span>
          </div>
          <LabeledDetail>
            <LabeledDetailLabel>
              {UI_TEXT.SUBSCRIPTION_CREDITS}
            </LabeledDetailLabel>
            <LabeledDetailDetail>
              <span>20</span>
              <span className="text-neutral-7"> / 100 {UI_TEXT.CREDITS}</span>
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.PURCHASED_CREDITS}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <span>0</span>
              <span className="text-neutral-7"> {UI_TEXT.CREDITS}</span>
            </LabeledDetailDetail>
          </LabeledDetail>
        </CardContent>
      </div>
      <CardFooter className="flex gap-5">
        <Button
          variant="outline"
          stretch
          asChild
          className="text-[0.875rem] md:text-[1rem]"
        >
          <Link href="/pricing">{UI_TEXT.UPGRADE_PLAN}</Link>
        </Button>
        <AddCreditsButton />
      </CardFooter>
    </Card>
  )
}
