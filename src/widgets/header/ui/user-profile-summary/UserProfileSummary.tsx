'use client'

import { useEffect } from 'react'

import { UserProfile } from '@/entities/user-profile'
import { useGetAuthProfile } from '@/entities/user-profile/model/adapter'
import { useAuthStore } from '@/entities/user-profile/model/store'

import { AvatarSkeleton } from '@/shared/ui/avatar'
import { CreditAmountSkeleton } from '@/shared/ui/credit'

import { Credit } from './ui/Credit'

export const UserProfileSummary = () => {
  const restriction = useAuthStore((state) => state.restriction)
  const user = useAuthStore((state) => state.user)
  const setRestriction = useAuthStore((state) => state.setRestriction)
  const setUser = useAuthStore((state) => state.setUser)

  const { data } = useGetAuthProfile()

  useEffect(() => {
    if (!data) return

    const { email, profileImageUrl, restriction } = data
    if (user === null) setUser({ email, profileImageUrl })
    setRestriction(restriction)
  }, [data])

  if (!restriction || !user)
    return (
      <div className="flex items-center gap-3">
        <CreditAmountSkeleton />
        <AvatarSkeleton />
      </div>
    )

  return (
    <div className="flex items-center gap-3">
      <Credit />
      <UserProfile />
    </div>
  )
}
