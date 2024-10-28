'use client'

import {
  CreditAmount,
  CreditAmountSkeleton,
  CreditResetIndicator
} from '@/shared/ui/Credit'

import { useAuthStore } from '../store'

export const Credit = () => {
  const restriction = useAuthStore((state) => state.restriction)

  if (!restriction) return <CreditAmountSkeleton />

  const credit = restriction.max - restriction.current
  const isOutOfCredit = restriction?.current >= restriction.max

  const creditDescription = isOutOfCredit ? (
    <CreditResetIndicator />
  ) : (
    <span className="font-medium text-[0.875rem] text-neutral-4">
      {restriction.max} credits per day
    </span>
  )

  return (
    <div className="flex items-center justify-between py-3 px-5">
      <CreditAmount credit={credit} isOutOfCredit={isOutOfCredit} />
      {creditDescription}
    </div>
  )
}
