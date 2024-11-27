'use client'

import { forwardRef } from 'react'

import Link from 'next/link'

import { Button, MenuItem } from '@/shared/ui'

import Smile from '/public/icons/smile.svg'

import { Navs, TagTypes } from './ui'

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
    <div className="fixed z-10 h-screen min-w-[280px] bg-background px-5 py-3">
      <Navs />
      <SidebarSeparator />

      <TagTypes />
      <SidebarSeparator />

      <MenuItem
        href={{ pathname: 'https://tally.so/r/314QEg' }}
        target="_blank"
        title="Feedback"
        prefix={<Smile />}
        isActive={false}
      />

      <li>
        <div className="p-[12px]">
          <Button asChild variant="link" className="p-0 text-[12px] text-white">
            <Link
              href="https://www.notion.so/ec82e5e0bba54f4b8a4ca2229eb16a22?pvs=4"
              target="_blank"
            >
              Terms of Use
            </Link>
          </Button>
          <span className="text-[12px] font-normal text-neutral-7"> and </span>
          <Button asChild variant="link" className="p-0 text-[12px] text-white">
            <Link
              href="https://www.notion.so/2b06e9bc71ab4d26bdcdd9cec7c8edae?pvs=4"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </Button>
        </div>
      </li>
    </div>
  )
}
