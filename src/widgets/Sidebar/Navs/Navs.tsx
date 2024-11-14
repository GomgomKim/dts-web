import { Menu, MenuItem } from '@/shared/ui'

import ExploreIcon from '/public/icons/compass.svg'
import FavoriteIcon from '/public/icons/heart.svg'

export const Navs = () => {
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
            href: { pathname: '/favorites', query: { sortingType: 'NEWEST' } },
            title: 'Favorites',
            prefix: <FavoriteIcon />
          }}
        />
      </li>
    </Menu>
  )
}
