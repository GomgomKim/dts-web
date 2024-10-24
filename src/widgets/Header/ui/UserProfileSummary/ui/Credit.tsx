'use client'

import { useAuthStore } from '@/entities/UserProfile/store'

import {
  CreditAmount,
  CreditAmountSkeleton,
  CreditResetIndicator
} from '@/shared/ui/Credit'

export const Credit = () => {
  const restriction = useAuthStore((state) => state.restriction)

  if (!restriction) return <CreditAmountSkeleton />

  const credit = restriction.max - restriction.current
  const isOutOfCredit = restriction?.current >= restriction.max

  const creditDescription = isOutOfCredit ? <CreditResetIndicator /> : null

  return (
    <div className="flex gap-2 items-center mx-3 my-auto">
      <CreditAmount credit={credit} isOutOfCredit={isOutOfCredit} />
      {creditDescription}
    </div>
  )
}
