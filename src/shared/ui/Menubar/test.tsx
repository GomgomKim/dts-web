import { Button } from '@/sdcn/components/ui/Button'
import Link from 'next/link'
import { forwardRef } from 'react'

import ExploreIcon from '/public/icons/compass.svg'
import FavoriteIcon from '/public/icons/heart.svg'
import ArchiveIcon from '/public/icons/folder.svg'
import { Badge } from '@/shared/ui'
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
    postfix: <Badge>upcoming</Badge>
  }
]

type NavItemProps = {
  item: NavItemType
}

const NavItem = ({ item }: NavItemProps) => {
  return (
    <Button asChild variant="ghost" stretch>
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

const filterList = [
  { title: 'Beauty', queries: ['Makeup', 'Skincare', 'Hair'] },
  { title: 'Fashion', queries: [] }
]

export const Menubar = () => {
  return (
    <div>
      <ul>
        {navList.map((navItem) => (
          <li key={navItem.title}>
            <NavItem item={navItem} />
          </li>
        ))}
      </ul>
      <MenubarSeparator />
      <ul>
        {filterList.map((filterItem) => (
          <MenuGroup
            key={filterItem.title}
            title={filterItem.title}
            prefix={
              <div className="w-[10px] h-[10px] bg-[#6161F2] rounded-[2px]"></div>
            }
          >
            {filterItem.queries.map((query) => (
              <MenuItem key={query}>{query}</MenuItem>
            ))}
          </MenuGroup>
        ))}
      </ul>
    </div>
  )
}

// import { forwardRef, useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { Badge } from '@/shared/ui/Badge'
// import { cn } from '@/sdcn/lib/utils'

// interface MenuProps extends React.ComponentProps<'ul'> {}
// export const Menu = forwardRef<HTMLUListElement, MenuProps>(
//   ({ ...props }, ref: React.Ref<HTMLUListElement>) => {
//     return <ul ref={ref} className="bg-black py-3 px-5" {...props}></ul>
//   }
// )
// Menu.displayName = 'Menu'

interface MenuItemProps extends Omit<React.ComponentProps<'li'>, 'prefix'> {
  prefix?: React.ReactNode
  postfix?: React.ReactNode
}
export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ prefix, postfix, children, ...props }, ref: React.Ref<HTMLLIElement>) => {
    // const [isHovering, setIsHovering] = useState(false)

    // const pathname = usePathname()
    // const isHere = pathname === '/' + children?.toString().toLowerCase()

    return (
      <li ref={ref} {...props}>
        <div
          className={cn(
            'flex justify-between items-center p-3 text-[#AEAFB5] rounded-lg'
          )}
          //     {
          //       'text-white bg-[#202124]': isHere || isHovering
          //     }
          //   )}
          //   onMouseOver={() => setIsHovering(true)}
          //   onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex justify-center items-center gap-5">
            <span className="w-4 h-4 flex justify-center items-center">
              {prefix}
            </span>
            <span>{children}</span>
          </div>
          {postfix && postfix}
        </div>
      </li>
    )
  }
)
MenuItem.displayName = 'MenuItem'

interface MenuGroupProps extends Omit<React.ComponentProps<'div'>, 'prefix'> {
  title: string
  prefix: React.ReactNode
  postfix?: React.ReactNode
  children?: React.ReactNode
}
export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  (
    { title, prefix, postfix, children, ...props },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} {...props} role="group">
        <div className="flex justify-between items-center p-3 text-[#AEAFB5]">
          <div className="flex justify-center items-center gap-5">
            <span className="w-4 h-4 flex justify-center items-center">
              {prefix}
            </span>
            <span className="flex justify-center items-center">{title}</span>
          </div>
          {postfix && postfix}
        </div>
        {children}
      </div>
    )
  }
)
MenuGroup.displayName = 'MenuGroup'

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

// export const Menubar = () => {
//   return (
//     <Menu style={{ width: '500px' }}>
//       <MenuItem href="./expore" prefix="E">
//         Explore
//       </MenuItem>
//       <MenuItem href="./favorites" prefix="E">
//         Favorites
//       </MenuItem>
//       <MenuItem href="./archive" prefix="E">
//         Archive
//       </MenuItem>

//       <MenubarSeparator />

//   <MenuGroup
//     title="Beauty"
//     prefix={
//       <div className="w-[10px] h-[10px] bg-[#6161F2] rounded-[2px]"></div>
//     }
//   >
//     <MenuItem href="./beauty/makeup">Makeup</MenuItem>
//     <MenuItem href="./beauty/skincare">Skincare</MenuItem>
//     <MenuItem href="./beauty/hair">Hair</MenuItem>
//   </MenuGroup>

//       <MenuGroup
//         title="Fashion"
//         prefix={
//           <div className="w-[10px] h-[10px] bg-[#AA4ACB] rounded-[2px]"></div>
//         }
//         postfix={<Badge>Upcoming</Badge>}
//       >
//         {/* ... */}
//       </MenuGroup>

//       <MenubarSeparator />

//       <MenuItem href="./help" prefix="?">
//         Help
//       </MenuItem>
//     </Menu>
//   )
// }
