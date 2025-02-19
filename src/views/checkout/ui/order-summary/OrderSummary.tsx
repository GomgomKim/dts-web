'use client'

import { useSearchParams } from 'next/navigation'

import { CreditOrderSummary, PlanOrderSummary, UpgradeOrderSummary } from './ui'

export const OrderSummary = () => {
  const searchParams = useSearchParams()

  const planId = searchParams.get('planId')
  const creditId = searchParams.get('creditId')
  const upgradePlanId = searchParams.get('upgradePlanId')

  if (planId) return <PlanOrderSummary />
  if (creditId) return <CreditOrderSummary />
  if (upgradePlanId) return <UpgradeOrderSummary />
}
