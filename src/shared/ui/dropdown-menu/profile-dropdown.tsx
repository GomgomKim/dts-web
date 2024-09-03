import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'

import { Button } from '@/shared/ui'

import CreditIcon from '/public/icons/database.svg'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'

const ProfileDropdown = () => {
  const [credit] = useState(0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Profile Modal</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <div className="flex items-center gap-x-3 py-3 px-5">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="profile Image"
              src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/646/15fd24a290e3154d44f486b0720b0692_res.jpeg"
            />
          </div>
          <span>cj.lee@growdle.com</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>CREDITS</DropdownMenuLabel>
        <div className="flex items-center justify-between py-3 px-5">
          {/* [TODO] credit text에 variant 추가*/}
          <div className="flex gap-2 items-center">
            <CreditIcon
              className={cn('stroke-white', {
                'stroke-[#FF8480]': credit === 0
              })}
            />
            <span className={cn({ 'text-[#FF8480]': credit === 0 })}>
              {credit}
            </span>
          </div>
          <span className="font-medium text-sm text-[#616268]">
            100 credits per day
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>FAQs</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Feedback</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ProfileDropdown }
