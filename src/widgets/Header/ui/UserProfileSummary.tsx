'use client'

import { UserProfile } from '@/entities/UserProfile'
import { useAuthStore } from '@/entities/UserProfile/store'

import { cn } from '@/shared/lib/utils'

import CreditIcon from '/public/icons/database.svg'

export const UserProfileSummary = () => {
  const restriction = useAuthStore((state) => state.restriction)

  const isZeroRestriction = restriction?.current === 20

  return (
    <div className="flex gap-3 items-center ml-3">
      <div className="flex gap-2 items-center px-3">
        <CreditIcon
          className={cn('stroke-white', {
            'stroke-[#FF8480]': isZeroRestriction
          })}
        />
        <span
          className={cn('text-[14px]', { 'text-[#FF8480]': isZeroRestriction })}
        >
          {restriction ? restriction?.max - restriction?.current : null}
        </span>
        {isZeroRestriction ? (
          <div className="font-[14px] text-[0.875rem] text-neutral-4 flex items-center">
            Credits reset at midnight
            <span className="ml-[8px]">🌙</span>
          </div>
        ) : null}
      </div>

      <UserProfile />
    </div>
  )
}
