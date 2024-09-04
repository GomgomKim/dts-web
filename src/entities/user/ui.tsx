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
import Image from 'next/image'
import CreditIcon from '/public/icons/database.svg'
import { faker } from '@faker-js/faker'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

export const UserProfile = () => {
  const queryClient = useQueryClient()

  const { restriction, isAuth, user, setUser, logOut } = useAuthStore.getState()

  React.useEffect(() => {
    if (!isAuth) return

    const getUserInfo = async () => {
      return {
        data: {
          email: 'dts-test@example.com',
          image: faker.image.urlLoremFlickr()
        }
      }
    }
    getUserInfo().then((res) => {
      setUser(res.data)
    })
  }, [isAuth])

  const handleClickLogout = () => {
    logOut(queryClient)
  }
  if (!user) return <div>loading user info ...</div>

  const isZeroRestriction = restriction === 0

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
        <div>
          {/* TODO: image 없으면 null profile */}
          <Image src={user.image} alt="profile image" width={40} height={40} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[320px]">
        <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
        <div className="flex items-center gap-3 py-3 px-5">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt="profile image"
              width={40}
              height={40}
            />
          </div>
          <span>{user.email}</span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="pt-2">CREDITS</DropdownMenuLabel>
        <div className="flex items-center justify-between py-3 px-5">
          {/* [TODO] credit text에 variant 추가*/}
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
              {restriction}
            </span>
          </div>
          {description}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/#">FAQs</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/#">Feedback</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleClickLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
