'use client'

import { ComponentProps } from 'react'
import * as React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface MenuItemType {
  href: { pathname: string; query?: { [key: string]: string } }
  title: string
  prefix: React.ReactNode
  postfix?: React.ReactNode
  disabled?: boolean
}

// menu

interface MenuProps extends ComponentProps<'ul'> {}
export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ ...props }, ref: React.Ref<HTMLUListElement>) => {
    return <ul ref={ref} {...props}></ul>
  }
)
Menu.displayName = 'Menu'

// menu item

interface MenuItemProps {
  item: MenuItemType
}

export const MenuItem = ({ item }: MenuItemProps) => {
  const pathname = usePathname()
  const isHere = pathname === item.href.pathname

  return (
    <Button asChild variant="ghost" stretch className={cn({ active: isHere })}>
      <Link
        href={item.href}
        aria-disabled={item.disabled}
        className={cn('group justify-between items-center !px-[12px]', {
          'pointer-events-none': item.disabled
        })}
      >
        <div className="flex justify-center items-center gap-5 ">
          <span className="[&>svg]:stroke-secondary-foreground [&>svg]:group-hover:stroke-white [&>svg]:group-active:stroke-white">
            {item.prefix}
          </span>
          <span>{item.title}</span>
        </div>
        {item.postfix ? <span>{item.postfix}</span> : null}
      </Link>
    </Button>
  )
}

//  menu group

interface MenuGroupProps extends Omit<React.ComponentProps<'div'>, 'prefix'> {
  title: string
  prefix: React.ReactNode
  postfix?: React.ReactNode
  children?: React.ReactNode
}
export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  (
    { title, prefix, postfix, children, ...props },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className="text-[14px]" {...props} role="group">
        <div className="flex justify-between items-center p-3 rounded-lg text-[#aeafb5]">
          <div className="flex justify-center items-center gap-5">
            <span className="flex justify-center items-center gap-[20px] w-4 h-4">
              {prefix}
            </span>
            <span className="flex justify-center items-center text-[0.875rem]">
              {title}
            </span>
          </div>
          {postfix && postfix}
        </div>
        {children}
      </div>
    )
  }
)
MenuGroup.displayName = 'MenuGroup'
