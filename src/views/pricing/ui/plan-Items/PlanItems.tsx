'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useGetPlanInfo } from '@/shared/lib/hooks/useGetPlanInfo'
import { Badge, Button } from '@/shared/ui'

import { useGetMemberShip } from '../../model/adapter'
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
  const { getPlanByName } = useGetPlanInfo()
  const currency = useCurrencyStore((state) => state.currency)
  const [myPlan, setMyPlan] = useState<Plan | null>(null)
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false)

  const endIndex = PLAN_ITEMS[currency].length - 1

  const { data: subscribingPlanInfo, isLoading } = useGetMemberShip()

  useEffect(() => {
    if (!subscribingPlanInfo) return

    const myPlan = getPlanByName(subscribingPlanInfo.plan) || null
    setMyPlan(myPlan)

    const isSubscribing =
      subscribingPlanInfo.plan !== 'FREE' && subscribingPlanInfo.plan !== null
    setIsSubscribing(isSubscribing)
  }, [subscribingPlanInfo])

  if (isLoading) return <div>Loading...</div>

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
                !isSubscribing && isPopular ? (
                  <Badge className="bg-primary text-neutral-0">
                    {UI_TEXT.POPULAR}
                  </Badge>
                ) : null
              }
              slot={
                isSubscribing ? (
                  afterSubscribe(item, myPlan)
                ) : (
                  <SubscribeButton item={item} isPopular={isPopular} />
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
            isSubscribing ? (
              afterSubscribe(PLAN_ITEMS[currency][endIndex], myPlan)
            ) : (
              <SubscribeButton
                item={PLAN_ITEMS[currency][endIndex]}
                isPopular={false}
              />
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
    console.log('my plan is null!')
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
