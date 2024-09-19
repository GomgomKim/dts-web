'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { Button, MenuItem } from '@/shared/ui'
import { Menubar } from './Menubar'
import { Categorybar } from './Categorybar'

interface SidebarSeparatorProps extends React.ComponentProps<'div'> {}
const SidebarSeparator = forwardRef<HTMLDivElement, SidebarSeparatorProps>(
  ({ ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="my-3 border-b border-[#2D2E33]"
        {...props}
      ></div>
    )
  }
)
SidebarSeparator.displayName = 'SidebarSeparator'

export const Sidebar = () => {
  return (
    <div className="min-w-[280px] px-5 py-3 fixed h-screen">
      <Menubar />
      <SidebarSeparator />
      <Categorybar />
      <SidebarSeparator />
      <li>
        <MenuItem
          item={{
            href: { pathname: '/help' },
            title: 'Help',
            prefix: '?'
          }}
        />
      </li>
      <li>
        <Button asChild variant="link" className="p-[12px] text-inherit">
          <Link href="/terms" className="block">
            <p className="text-[12px] text-nowrap font-medium">
              Terms of Use
              <span className="font-normal text-neutral-7"> and </span>
              Privacy Policy
            </p>
          </Link>
        </Button>
      </li>
    </div>
  )
}
