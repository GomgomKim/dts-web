'use client'

import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import {
  CreditAmount,
  CreditAmountSkeleton,
  CreditResetIndicator
} from '@/shared/ui/credit'

export const Credit = () => {
  const restriction = useAuthStore((state) => state.restriction)

  if (!restriction) return <CreditAmountSkeleton />

  const credit = restriction.current
  const isOutOfCredit = credit <= 0

  const creditDescription = isOutOfCredit ? (
    <CreditResetIndicator />
  ) : (
    <span className="text-[0.875rem] font-medium text-neutral-4">
      {restriction.max} credits per day
    </span>
  )

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <CreditAmount credit={credit} isOutOfCredit={isOutOfCredit} />
      {creditDescription}
    </div>
  )
}
