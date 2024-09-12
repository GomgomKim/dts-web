import ExploreIcon from '/public/icons/compass.svg'
import FavoriteIcon from '/public/icons/heart.svg'
// import ArchiveIcon from '/public/icons/folder.svg'

import { Menu, MenuItem } from '@/shared/ui'

const Menubar = () => {
  return (
    <Menu>
      <li>
        <MenuItem
          item={{
            href: { pathname: '/explore', query: { filterType: 'ALL' } },
            title: 'Explore',
            prefix: <ExploreIcon />
          }}
        />
      </li>
      <li>
        <MenuItem
          item={{
            href: { pathname: '/favorites', query: { filterType: 'ALL' } },
            title: 'Favorites',
            prefix: <FavoriteIcon />
          }}
        />
      </li>
    </Menu>
  )
}

export { Menubar }
