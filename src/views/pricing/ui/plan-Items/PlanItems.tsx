import Link from 'next/link'

import { Badge, Button } from '@/shared/ui'

import { useCurrencyStore } from '../../model/useCurrencyStore'
import {
  PLAN_CUSTOM,
  PLAN_FEATURES,
  PLAN_ITEMS,
  UI_TEXT
} from './model/constant'
import { PLAN_TITLE_NAME_MAP, Plan } from './model/types'
import { PlanChangeButton } from './ui/plan-change-button'
import { PlanItem } from './ui/plan-item'
import { SubscribeButton } from './ui/subscription-button'

const POPULAR_PLAN_TITLE = PLAN_TITLE_NAME_MAP['3 Models']

export const PlanItems = () => {
  // isLoggedIn = true이면 memebership 확인
  const subscribingPlanName = 'MODEL_3' // api
  const isBeforeSubscribing = true
  // subscribingPlanName === 'FREE' || subscribingPlanName === null
  const subscribingPlanTitle = subscribingPlanName

  const currency = useCurrencyStore((state) => state.currency)

  const myPlan =
    PLAN_ITEMS[currency].find((item) => item.name === subscribingPlanTitle) ||
    null

  const endIndex = PLAN_ITEMS[currency].length - 1

  return (
    <div className="m-auto flex flex-col gap-5">
      {/* n models plans */}
      <div className="flex basis-[520px] gap-5">
        {PLAN_ITEMS[currency].slice(0, endIndex).map((item) => {
          const isPopular = POPULAR_PLAN_TITLE === item.name

          return (
            <PlanItem
              key={item.id}
              item={item}
              features={PLAN_FEATURES[item.name as keyof typeof PLAN_FEATURES]}
              badge={
                isBeforeSubscribing && isPopular ? (
                  <Badge className="bg-primary text-neutral-0">
                    {UI_TEXT.POPULAR}
                  </Badge>
                ) : null
              }
              slot={
                isBeforeSubscribing ? (
                  <SubscribeButton item={item} isPopular={isPopular} />
                ) : (
                  afterSubscribe(item, myPlan)
                )
              }
            />
          )
        })}
      </div>
      <div className="flex gap-5">
        {/* Unlimited plan */}
        <PlanItem
          item={PLAN_ITEMS[currency][endIndex]}
          features={
            PLAN_FEATURES[
              PLAN_ITEMS[currency][endIndex].name as keyof typeof PLAN_FEATURES
            ]
          }
          slot={
            isBeforeSubscribing ? (
              <SubscribeButton
                item={PLAN_ITEMS[currency][endIndex]}
                isPopular={false}
              />
            ) : (
              afterSubscribe(PLAN_ITEMS[currency][endIndex], myPlan)
            )
          }
        />

        {/* Custom plan */}
        <PlanItem
          item={PLAN_CUSTOM}
          features={
            PLAN_FEATURES[PLAN_CUSTOM.name as keyof typeof PLAN_FEATURES]
          }
          slot={
            <Button
              variant="primary"
              size="small"
              stretch
              className="bg-white font-semibold hover:bg-white"
              asChild
            >
              <Link href="#">{UI_TEXT.LETS_TALK}</Link>
            </Button>
          }
        />
      </div>
    </div>
  )
}

const afterSubscribe = (item: Plan, myPlan: Plan | null) => {
  if (myPlan === null) {
    alert('my plan is null!')
    return null
  }

  if (item.name === myPlan.name) {
    return (
      <Button
        variant="primary"
        size="small"
        stretch
        className="bg-white font-semibold hover:bg-white"
        disabled
      >
        {UI_TEXT.CURRENT_PLAN}
      </Button>
    )
  }

  return <PlanChangeButton myPlan={myPlan} selectedPlan={item} />
}
