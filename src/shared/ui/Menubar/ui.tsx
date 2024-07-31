'use client'

import { Button } from '@/sdcn/components/ui/Button'
import Link from 'next/link'

import ExploreIcon from '/public/icons/compass.svg'
import FavoriteIcon from '/public/icons/heart.svg'
import ArchiveIcon from '/public/icons/folder.svg'
import { usePathname } from 'next/navigation'
import { cn } from '@/sdcn/lib/utils'

type MenuItemType = {
  href: string
  title: string
  prefix: React.ReactNode
  postfix?: React.ReactNode
}

const navList: MenuItemType[] = [
  { href: '/explore', title: 'Explore', prefix: <ExploreIcon /> },
  { href: '/favorites', title: 'Favorites', prefix: <FavoriteIcon /> },
  {
    href: '/archive',
    title: 'Archive',
    prefix: <ArchiveIcon />
  }
]

type MenuItemProps = {
  item: MenuItemType
}

const MenuItem = ({ item }: MenuItemProps) => {
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

export const Menubar = () => {
  return (
    <ul>
      {navList.map((navItem) => (
        <li key={navItem.title}>
          <MenuItem item={navItem} />
        </li>
      ))}
    </ul>
  )
}
