'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useGetMemberShip } from '@/views/pricing/model/adapter'
import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { PLAN_NAME_TITLE_MAP } from '@/views/pricing/ui/plan-Items/model/types'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'
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

type SubscriptionState = 'active' | 'inactive' | 'pendingInactive'

export const CurrentSubscription = () => {
  const { openModal } = useModals()
  const { getPlanByName } = useGetPlanInfo()
  const [subscriptionState, setSubscriptionState] =
    useState<SubscriptionState | null>(null)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const { data: membershipData, isLoading } = useGetMemberShip()

  useEffect(() => {
    if (!membershipData) return

    if (membershipData.nextPlanId === null) {
      // nextBillingAt 만료인지 확인 추가
      setSubscriptionState('pendingInactive')
    } else {
      setSubscriptionState('active')
    }
  }, [membershipData])

  const myPlanName = membershipData?.plan
  const myPlan = myPlanName && getPlanByName(myPlanName)

  // TODO: line-height 수정
  return (
    <Card className="flex h-[301px] max-w-[588px] flex-1 shrink-0 basis-[460px] flex-col">
      <div className="flex grow flex-col justify-between">
        <CardHeader className="flex items-center gap-[11px] pr-5">
          <CardTitle>{UI_TEXT.CURRENT_SUBSCRIPTION}</CardTitle>
          {subscriptionState === 'inactive' ? (
            <ModelStatus isActive={false} />
          ) : null}
        </CardHeader>
        <CardContent className="space-y-4 pr-5">
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.PRICE}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <>
                {subscriptionState === 'inactive'
                  ? '-'
                  : myPlan
                    ? `${currencySign}${myPlan.price} for ${PLAN_NAME_TITLE_MAP[myPlan?.name ?? '']}`
                    : '-'}
              </>
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.BILLING_PERIOD}</LabeledDetailLabel>
            <LabeledDetailDetail>
              {!subscriptionState || subscriptionState === 'inactive'
                ? '-'
                : 'Monthly'}
            </LabeledDetailDetail>
          </LabeledDetail>
          <LabeledDetail>
            <LabeledDetailLabel>{UI_TEXT.RENEWAL_DATE}</LabeledDetailLabel>
            <LabeledDetailDetail>
              <>
                {/* TODO: 구독 종료 예정시 Ends on */}
                {!subscriptionState && '-'}
                {subscriptionState === 'active' &&
                  // UI_TEXT.RENEWS_ON + ' ' + '2024. 12. 25'}
                  UI_TEXT.RENEWS_ON +
                    ' ' +
                    (membershipData?.nextBillingAt ?? '')}
                {subscriptionState === 'inactive' &&
                  UI_TEXT.SUBSCRIPTION_EXPIRED}
                {subscriptionState === 'pendingInactive' && 'ends on ...'}
              </>
            </LabeledDetailDetail>
          </LabeledDetail>
          <CardDescription className="mt-3 h-[19px] text-end">
            <>
              {subscriptionState === 'active' && UI_TEXT.RENEWS_AUTOMATICALLY}
              {subscriptionState === 'pendingInactive' &&
                UI_TEXT.YOUR_SUBSCRIPTION_EXPIRED_ON + ' ' + '2024. 12. 12'}
              {/* TODO: nextBillingAt - 1 */}
            </>
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter className="flex gap-5">
        {subscriptionState !== 'inactive' ? (
          <>
            <Button
              variant="outline"
              stretch
              disabled={!myPlan || isLoading}
              onClick={() => {
                if (!myPlan) return // TODO:
                openModal(SubscriptionCancelModal, { myPlan })
              }}
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
