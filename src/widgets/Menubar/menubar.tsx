'use client'

import { Button } from '@/sdcn/components/ui/Button'
import Link from 'next/link'
import { forwardRef } from 'react'

import ExploreIcon from '/public/icons/compass.svg'
import FavoriteIcon from '/public/icons/heart.svg'
import ArchiveIcon from '/public/icons/folder.svg'
import { Badge } from '@/shared/ui'
import { usePathname } from 'next/navigation'
import { cn } from '@/sdcn/lib/utils'

type NavItemType = {
  href: string
  title: string
  prefix: React.ReactNode
  postfix?: React.ReactNode
}

const navList: NavItemType[] = [
  { href: '/explore', title: 'Explore', prefix: <ExploreIcon /> },
  { href: '/favoriate', title: 'Favoriate', prefix: <FavoriteIcon /> },
  {
    href: '/archive',
    title: 'Archive',
    prefix: <ArchiveIcon />,
    postfix: <Badge>Upcoming</Badge>
    // TODO: disabled
  }
]

type NavItemProps = {
  item: NavItemType
}

const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname()
  const isHere = pathname === item.href

  return (
    <Button asChild variant="ghost" stretch className={cn({ active: isHere })}>
      <Link
        href={item.href}
        className="group justify-between items-center !px-[12px]"
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

const Navbar = () => {
  return (
    <ul>
      {navList.map((navItem) => (
        <li key={navItem.title}>
          <NavItem item={navItem} />
        </li>
      ))}
    </ul>
  )
}

export const Menubar = () => {
  return (
    <div className="min-w-[280px] px-5 py-3">
      <Navbar />
      <MenubarSeparator />
    </div>
  )
}

interface MenubarSeparatorProps extends React.ComponentProps<'div'> {}
export const MenubarSeparator = forwardRef<
  HTMLDivElement,
  MenubarSeparatorProps
>(({ ...props }, ref) => {
  return (
    <div ref={ref} className="my-3 border-b border-[#2D2E33]" {...props}></div>
  )
})
MenubarSeparator.displayName = 'MenubarSeparator'
