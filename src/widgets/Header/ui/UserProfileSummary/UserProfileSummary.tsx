'use client'

import { useEffect } from 'react'

import { UserProfile } from '@/entities/UserProfile'
import { useGetAuthProfile } from '@/entities/UserProfile/model/adapter'
import { useAuthStore } from '@/entities/UserProfile/store'

import { AvatarSkeleton } from '@/shared/ui/Avatar'
import { CreditAmountSkeleton } from '@/shared/ui/Credit'

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
      <div className="flex gap-3 items-center">
        <CreditAmountSkeleton />
        <AvatarSkeleton />
      </div>
    )

  return (
    <div className="flex gap-3 items-center">
      <Credit />
      <UserProfile />
    </div>
  )
}
