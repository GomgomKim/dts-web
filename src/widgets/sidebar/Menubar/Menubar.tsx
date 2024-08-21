import ExploreIcon from '/public/icons/compass.svg'
import FavoriteIcon from '/public/icons/heart.svg'
// import ArchiveIcon from '/public/icons/folder.svg'

import { type MenuItem as MenuItemT } from '@/shared/ui/menubar/model'
import { Menu, MenuItem } from '@/shared/ui'

const Menubar = () => {
  // TODO: 로그인 유저
  const navList: MenuItemT[] = [
    { href: '/explore', title: 'Explore', prefix: <ExploreIcon /> },
    { href: '/favorites', title: 'Favorites', prefix: <FavoriteIcon /> }
    // {
    //   href: '/archive',
    //   title: 'Archive',
    //   prefix: <ArchiveIcon />,
    //   postfix: <Badge>Upcoming</Badge>,
    //   disabled: true
    // }
  ]

  return (
    <Menu>
      {navList.map((navItem) => (
        <li key={navItem.title}>
          <MenuItem item={navItem} />
        </li>
      ))}
    </Menu>
  )
}

export { Menubar }
