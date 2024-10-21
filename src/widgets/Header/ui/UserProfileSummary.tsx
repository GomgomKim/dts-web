'use client'

import { useEffect } from 'react'

import { UserProfile } from '@/entities/UserProfile'
import { useGetAuthProfile } from '@/entities/UserProfile/model/adapter'
import { useAuthStore } from '@/entities/UserProfile/store'

import { cn } from '@/shared/lib/utils'

import CreditIcon from '/public/icons/database.svg'
import Spinner from '/public/icons/loading-spinner.svg'

export const UserProfileSummary = () => {
  // const queryClient = useQueryClient()
  const restriction = useAuthStore((state) => state.restriction)
  const user = useAuthStore((state) => state.user)
  const setRestriction = useAuthStore((state) => state.setRestriction)
  const setUser = useAuthStore((state) => state.setUser)

  const isOutOfCredit = restriction
    ? restriction?.current >= restriction.max
    : false

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ['authProfile'] })
  // }, [])

  const { data, isError, error } = useGetAuthProfile()

  useEffect(() => {
    if (!data) return
    const { email, profileImageUrl, restriction } = data
    if (user === null) setUser({ email, profileImageUrl })
    setRestriction(restriction)
  }, [data])

  if (isError) return <div>{error.message}</div>

  return (
    <div className="flex gap-3 items-center ml-3">
      <div className="flex gap-2 items-center px-3">
        <CreditIcon
          className={cn('stroke-white', {
            'stroke-[#FF8480]': isOutOfCredit
          })}
        />
        <span
          className={cn('text-[14px] w-4 text-center', {
            'text-[#FF8480]': isOutOfCredit
          })}
        >
          {restriction !== null ? (
            restriction?.max - restriction?.current
          ) : (
            <div className="w-4 h-4">
              <Spinner
                className="animate-spin"
                width={16}
                height={16}
                fill="#AEAFB5"
              />
            </div>
          )}
        </span>
        {isOutOfCredit ? (
          <div className="font-[14px] text-[0.875rem] text-neutral-4 flex items-center">
            Credits reset at midnight
            <span className="ml-[8px]">🌙</span>
          </div>
        ) : null}
      </div>

      {/* <Suspense fallback={<>profile</>}> */}
      <UserProfile />
      {/* </Suspense> */}
    </div>
  )
}
