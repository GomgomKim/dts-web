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

  const credit = restriction.current
  const isOutOfCredit = credit <= 0

  const creditDescription = isOutOfCredit ? <CreditResetIndicator /> : null

  return (
    <div className="mx-3 my-auto flex items-center gap-2">
      <CreditAmount credit={credit} isOutOfCredit={isOutOfCredit} />
      {creditDescription}
    </div>
  )
}
