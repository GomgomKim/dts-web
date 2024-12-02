'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { Menu, MenuItem } from '@/shared/ui'

import ExploreIcon from '/public/icons/compass.svg'
import ArchiveIcon from '/public/icons/folder.svg'
import FavoriteIcon from '/public/icons/heart.svg'

export const Navs = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isExplorePage = pathname.startsWith('/explore')
  const currentSearchParams = searchParams.get('filterType')
  const isValidFilterType =
    currentSearchParams === 'ALL' || currentSearchParams === 'FEATURED'

  const isActiveExplore = isExplorePage
    ? searchParams.get('filterType') === null || isValidFilterType
    : true

  return (
    <Menu>
      <MenuItem
        href={{ pathname: '/explore', query: { filterType: 'ALL' } }}
        title="Explore"
        prefix={<ExploreIcon />}
        isActive={pathname === '/explore' && isActiveExplore}
      />

      <MenuItem
        href={{ pathname: '/favorites', query: { sortingType: 'NEWEST' } }}
        title="Favorites"
        prefix={<FavoriteIcon />}
        isActive={pathname === '/favorites'}
      />

      <MenuItem
        href={{ pathname: '/archive' }}
        title="Archive"
        prefix={<ArchiveIcon />}
        isActive={pathname === '/archive'}
      />
    </Menu>
  )
}
