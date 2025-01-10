import Link from 'next/link'

import { Badge, Button } from '@/shared/ui'

import { PLAN_ITEMS, UI_TEXT } from './model/constant'
import { PlanChangeButton } from './ui/plan-change-button'
import { PlanItem } from './ui/plan-item'
import { Plan } from './ui/plan-item/type'
import { SubscribeButton } from './ui/subscription-button'

const POPULAR_PLANS = ['3 Models']

export const PlanItems = () => {
  const isBeforeSubscribe = true
  const myPlanId = '3' // TODO: 유효한 id 검사
  const myPlan = PLAN_ITEMS.find((item) => item.id === myPlanId) || null

  return (
    <div className="m-auto flex flex-col gap-5">
      {/* n models plans */}
      <div className="flex basis-[520px] gap-5">
        {PLAN_ITEMS.slice(0, 5).map((item) => {
          const isPopular = POPULAR_PLANS.includes(item.title)
          return (
            <PlanItem
              key={item.id}
              {...item}
              badge={
                isBeforeSubscribe && isPopular ? (
                  <Badge className="bg-primary text-neutral-0">
                    {UI_TEXT.POPULAR}
                  </Badge>
                ) : null
              }
              slot={
                isBeforeSubscribe ? (
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
        {PLAN_ITEMS.slice(5, 6).map((item) => (
          <PlanItem
            key={item.id}
            {...item}
            slot={
              isBeforeSubscribe ? (
                <SubscribeButton item={item} isPopular={false} />
              ) : (
                afterSubscribe(item, myPlan)
              )
            }
          />
        ))}
        {/* Contact Us plan */}
        {PLAN_ITEMS.slice(6).map((item) => (
          <PlanItem
            key={item.id}
            {...item}
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
        ))}
      </div>
    </div>
  )
}

const afterSubscribe = (item: Plan, myPlan: Plan | null) => {
  if (myPlan === null) {
    console.log('myPlan is null')
    return null
  }

  if (item.id === myPlan.id) {
    return (
      <Button
        variant="primary"
        size="small"
        stretch
        className="bg-white font-semibold hover:bg-white"
      >
        {UI_TEXT.ACTIVE}
      </Button>
    )
  }

  return <PlanChangeButton myPlan={myPlan} selectedPlan={item} />
}
