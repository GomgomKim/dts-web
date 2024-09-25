'use client'

import { forwardRef } from 'react'

import Link from 'next/link'

import { Button, MenuItem } from '@/shared/ui'

import Smile from '/public/icons/smile.svg'

import { Categorybar } from './Categorybar'
import { Menubar } from './Menubar'

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
            href: { pathname: '/feedback' },
            title: 'Feedback',
            prefix: <Smile />
          }}
        />
      </li>
      <li>
        <div className="p-[12px]">
          <Button asChild variant="link" className="text-white p-0 text-[12px]">
            <Link href="/terms">Terms of Use</Link>
          </Button>
          <span className="font-normal text-neutral-7 text-[12px]"> and </span>
          <Button asChild variant="link" className="text-white p-0 text-[12px]">
            <Link href="/policy">Privacy Policy</Link>
          </Button>
        </div>
      </li>
    </div>
  )
}
