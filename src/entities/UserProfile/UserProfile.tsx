'use client'

import Link from 'next/link'

import { Avatar, AvatarSkeleton } from '@/shared/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/DropdownMenu'

import { useAuthStore } from './store'
import { Credit, LogOut } from './ui'

export const UserProfile = () => {
  const user = useAuthStore((state) => state.user)

  if (!user) return <AvatarSkeleton />

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar profileImageUrl={user.profileImageUrl} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-3 w-[320px]">
        {/* menu 1 */}
        <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
        <div className="flex items-center gap-3 px-5 py-3">
          <Avatar profileImageUrl={user.profileImageUrl} />
          <span className="text-neutral-7">{user.email}</span>
        </div>

        {/* menu 2 */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="pt-2">CREDITS</DropdownMenuLabel>
        <Credit />

        {/* menu 3 */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="https://tally.so/r/314QEg" target="_blank">
              Feedback
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* menu 4 */}
        <DropdownMenuSeparator />
        <LogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
