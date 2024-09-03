'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/DropdownMenu/dropdown-menu'
import { useAuthStore } from './store'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { faker } from '@faker-js/faker'

export const UserProfile = () => {
  const queryClient = useQueryClient()

  const isAuth = useAuthStore((state) => state.isAuth)
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const logOut = useAuthStore((state) => state.logOut)

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Image src={user.image} alt="user avatar" width={50} height={50} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
        <DropdownMenuItem>
          <span>icon</span>
          <span>{user?.email}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>CREDITS</DropdownMenuLabel>
        <DropdownMenuItem disabled>
          <div>
            <span>icon</span>
            <span>80</span>
          </div>
          <span>100 credits per day</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled>FAQs</DropdownMenuItem>

        <DropdownMenuItem disabled>Feedback</DropdownMenuItem>

        <DropdownMenuItem onClick={handleClickLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
