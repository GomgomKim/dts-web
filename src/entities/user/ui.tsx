'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { useAuthStore } from './store'
import { useQueryClient } from '@tanstack/react-query'
import CreditIcon from '/public/icons/database.svg'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import Image from 'next/image'

const LogOut = () => {
  const queryClient = useQueryClient()
  // const router = useRouter()

  const logOut = useAuthStore((state) => state.logOut)

  const handleClickLogout = () => {
    logOut(queryClient)
    // router.replace('/explore?filterType=ALL')
  }
  return (
    <DropdownMenuItem onClick={handleClickLogout}>Log out</DropdownMenuItem>
  )
}

export const UserProfile = () => {
  const user = useAuthStore((state) => state.user)
  const restriction = useAuthStore((state) => state.restriction)

  const remainRestriction = restriction
    ? restriction?.max - restriction?.current
    : null

  const isZeroRestriction = remainRestriction === 0

  const description = isZeroRestriction ? (
    <div className="font-medium text-[0.875rem] text-[#616268]">
      Credits reset at midnight
      <span className="ml-[8px]">🌙</span>
    </div>
  ) : (
    <span className="font-medium text-[0.875rem] text-[#616268]">
      100 credits per day
    </span>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user ? (
            <Image
              src={user.profileImageUrl}
              alt="profile image"
              width={40}
              height={40}
            />
          ) : (
            <div>user image</div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[320px]">
        <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
        <div className="flex items-center gap-3 py-3 px-5">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {user ? (
              <Image
                src={user.profileImageUrl}
                alt="profile image"
                width={40}
                height={40}
              />
            ) : (
              <div>user image</div>
            )}
          </div>
          {user ? <span>{user.email}</span> : <span>user email</span>}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="pt-2">CREDITS</DropdownMenuLabel>
        <div className="flex items-center justify-between py-3 px-5">
          <div className="flex gap-2 items-center">
            <CreditIcon
              className={cn('stroke-white', {
                'stroke-[#FF8480]': isZeroRestriction
              })}
            />
            <span
              className={cn('text-[14px]', {
                'text-[#FF8480]': isZeroRestriction
              })}
            >
              {remainRestriction === null ? 'loading' : remainRestriction}
            </span>
          </div>
          {description}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/#">Feedback</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
