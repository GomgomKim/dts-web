'use client'

import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'

import CreditIcon from '/public/icons/database.svg'
import UserIcon from '/public/icons/user.svg'

import { useQueryClient } from '@tanstack/react-query'

import { useAuthStore } from './store'

const LogOut = () => {
  const queryClient = useQueryClient()

  const logOut = useAuthStore((state) => state.logOut)

  const handleClickLogout = () => {
    logOut(queryClient)
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
    <div className="font-medium text-[0.875rem] text-neutral-4 flex items-center">
      Credits reset at midnight
      <span className="ml-[8px]">🌙</span>
    </div>
  ) : (
    <span className="font-medium text-[0.875rem] text-neutral-4">
      20 credits per day
    </span>
  )

  return (
    <DropdownMenu modal={false}>
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
            <div className="bg-neutral-2 w-full h-full relative">
              <UserIcon className="absolute-center" />
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[320px] mt-3">
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
              <div className="bg-neutral-2 w-full h-full relative">
                <UserIcon className="absolute-center" />
              </div>
            )}
          </div>
          <span className="text-neutral-7">{user ? user.email : 'email'}</span>
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
              {remainRestriction === null ? '000' : remainRestriction}
            </span>
          </div>
          {description}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="https://tally.so/r/314QEg" target="_blank">
              Feedback
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
