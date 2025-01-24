'use client'

import Link from 'next/link'

import { PLAN_ITEMS } from '@/views/pricing/ui/plan-Items/model/constant'

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
import useModals from '@/shared/ui/modal/model/Modals.hooks'
import { ModelStatus } from '@/shared/ui/model-status'

import { UI_TEXT } from '../../model/constants'
import { SubscriptionCancelModal } from '../subscription-cancel-modal'

export const CurrentSubscription = () => {
  const isActive = true
  const { openModal } = useModals()

  // 더미 데이터
  const myPlanId = '5'
  const myPlan = PLAN_ITEMS.find((item) => item.id === myPlanId)!

  return (
    <Card className="flex h-[301px] max-w-[588px] flex-1 shrink-0 basis-[460px] flex-col">
      <div className="flex grow flex-col justify-between">
        <CardHeader className="flex items-center gap-[11px] pr-5">
          <CardTitle>{UI_TEXT.CURRENT_SUBSCRIPTION}</CardTitle>
          {isActive ? null : <ModelStatus isActive={isActive} />}
        </CardHeader>
        <CardContent className="space-y-4 pr-5">
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.PRICE}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <>{isActive ? `$${myPlan.price} for ${myPlan.title}` : '-'}</>
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.BILLING_PERIOD}</LabeledDetailLabel>
            <LabeledDetailDetail>
              {isActive ? 'Monthly' : '-'}
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.RENEWAL_DATE}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <>
                {isActive
                  ? UI_TEXT.RENEWS_ON + ' ' + '2024. 12. 25'
                  : UI_TEXT.SUBSCRIPTION_EXPIRED}
              </>
            </LabeledDetailDetail>
          </LabeledDetail>
          <CardDescription className="mt-3 text-end">
            <>
              {isActive
                ? UI_TEXT.RENEWS_AUTOMATICALLY
                : UI_TEXT.YOUR_SUBSCRIPTION_EXPIRED_ON + ' ' + '2024. 12. 12'}
            </>
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter className="flex gap-5">
        {isActive ? (
          <>
            <Button
              variant="outline"
              stretch
              onClick={() => openModal(SubscriptionCancelModal, { myPlan })}
            >
              {UI_TEXT.CANCEL}
            </Button>
            <Button stretch className="font-semibold" asChild>
              <Link href="/pricing">{UI_TEXT.UPGRADE_PLAN}</Link>
            </Button>
          </>
        ) : (
          <Button stretch className="font-semibold" asChild>
            <Link href="/pricing">{UI_TEXT.REACTIVATE_PLAN}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
