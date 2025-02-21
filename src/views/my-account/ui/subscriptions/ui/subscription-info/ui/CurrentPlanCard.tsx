import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

// import { formattedDate } from '@/views/checkout/ui/order-summary/ui/period-of-use/lib'
import { useGetMemberShip } from '@/views/pricing/model/adapter'
import {
  PLAN_NAME_TITLE_MAP,
  Plan
} from '@/views/pricing/ui/plan-Items/model/types'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle
} from '@/shared/ui/card'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'
import { ModelStatus } from '@/shared/ui/model-status'

import modelImage from '/public/images/dayoung-1_1-FRONT-watermark.webp'

import { UI_TEXT } from '../../../model/constants'

type SubscriptionState = 'active' | 'inactive' | 'willInactive'

export const CurrentPlanCard = () => {
  const { getPlanById, getPlanByName } = useGetPlanInfo()
  const { data: membershipData } = useGetMemberShip()

  const [myPlan, setMyPlan] = useState<Plan | null>(null)
  const [subscriptionState, setSubscriptionState] =
    useState<SubscriptionState | null>('inactive')

  useEffect(() => {
    if (!membershipData) return

    if (membershipData.plan === null) {
      setSubscriptionState('inactive')
      return
    }

    // 내 구독 플랜 정보
    const myPlanName = membershipData.plan
    const myPlan = getPlanByName(myPlanName)
    if (!myPlan) return
    setMyPlan(myPlan)

    // 구독 상태: SubscriptionState
    if (membershipData.nextPlanId === 0) {
      setSubscriptionState('willInactive')
    } else {
      setSubscriptionState('active')
    }
  }, [membershipData])

  // TODO: data fetching skeleton ...
  if (!membershipData)
    return (
      <Card className="flex h-[280px] shrink-0 grow basis-[372px] flex-col md:h-auto md:w-[488px] lg:max-w-[556px]"></Card>
    )

  const nextPlanId = membershipData?.nextPlanId
  const nextPlan = nextPlanId && getPlanById(nextPlanId)
  const nextPlanTitle = nextPlan && PLAN_NAME_TITLE_MAP[nextPlan.name]

  // 다음 플랜 다운그레이드 여부
  const willDowngrade = membershipData.nextPlanId < (myPlan?.id || 0) || false

  return (
    <Card className="flex h-[280px] shrink-0 grow basis-[372px] flex-col md:h-auto md:w-[488px] lg:max-w-[556px]">
      <div className="flex grow flex-col md:flex-row">
        <div className="flex grow flex-col justify-between">
          <CardHeader className="flex items-center gap-[11px] pr-5 ">
            <CardTitle>
              <h3>{UI_TEXT.CURRENT_PLAN}</h3>
            </CardTitle>
            <ModelStatus isActive={subscriptionState !== 'inactive'} />
          </CardHeader>
          <CardContent className="space-y-3 pr-5 md:space-y-4">
            <LabeledDetail>
              <LabeledDetailLabel>{UI_TEXT.MODEL}</LabeledDetailLabel>
              <LabeledDetailDetail>
                <span>
                  {subscriptionState !== 'inactive'
                    ? membershipData?.modelIds
                    : '0'}
                </span>
                <span className="font-normal text-neutral-7">
                  {' '}
                  /{' '}
                  {subscriptionState !== 'inactive' && myPlan
                    ? PLAN_NAME_TITLE_MAP[myPlan?.name]
                    : '0 Model'}
                </span>
              </LabeledDetailDetail>
            </LabeledDetail>
            <LabeledDetail>
              <LabeledDetailLabel>{UI_TEXT.CREDITS}</LabeledDetailLabel>
              <LabeledDetailDetail>
                <span>{subscriptionState !== 'inactive' ? '~' : '0'}</span>
                <span className="font-normal text-neutral-7">
                  {' '}
                  / {subscriptionState !== 'inactive'
                    ? myPlan?.creditNum
                    : '0'}{' '}
                  {UI_TEXT.CREDITS}
                </span>
              </LabeledDetailDetail>
            </LabeledDetail>
            <LabeledDetail>
              <LabeledDetailLabel>{UI_TEXT.SUBSCRIPTION}</LabeledDetailLabel>
              <LabeledDetailDetail>
                <>
                  {
                    subscriptionState === 'active' && UI_TEXT.RENEWS_ON + ' '
                    // + formattedDate(new Date(membershipData.nextBillingAt))
                  }
                  {subscriptionState === 'willInactive' && UI_TEXT.ENDS_ON + ''}
                  {subscriptionState === 'inactive' &&
                    UI_TEXT.SUBSCRIPTION_EXPIRED}
                </>
              </LabeledDetailDetail>
            </LabeledDetail>
            {/* 다운그레이드시 설명 */}
            {willDowngrade && (
              <div className="!mt-3 text-right font-medium text-neutral-6">
                <span>*Downgrade to {nextPlanTitle} Plan</span>
              </div>
            )}
          </CardContent>
        </div>
        <div className="hidden shrink-0 md:block">
          <CardImage className="pb-5 pl-0">
            <div className="relative aspect-[120/200] min-w-[120px] overflow-hidden rounded-[0.5rem]">
              <Image
                src={modelImage}
                alt=""
                fill
                className={cn('object-cover', {
                  'grayscale-[50]': subscriptionState === 'inactive'
                })}
              />
            </div>
          </CardImage>
        </div>
      </div>
      <CardFooter className="flex gap-5">
        <Button
          variant="outline"
          stretch
          asChild
          className="text-[0.875rem] md:text-[1rem]"
        >
          <Link href="/pricing">
            {subscriptionState !== 'inactive'
              ? UI_TEXT.UPGRADE_PLAN
              : UI_TEXT.REACTIVATE_PLAN}
          </Link>
        </Button>
        <Button
          variant="primary"
          stretch
          className="text-[0.875rem] md:text-[1rem]"
          asChild
        >
          <Link href="/my-account/my-models">{UI_TEXT.VIEW_MY_MODELS}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
