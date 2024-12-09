'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { Menu, MenuItem } from '@/shared/ui'

import ExploreIcon from '/public/icons/compass.svg'
import MyModelsIcon from '/public/icons/folder.svg'
import FavoriteIcon from '/public/icons/heart.svg'

export const Navs = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isExplorePage = pathname.startsWith('/explore')
  const currentSearchParams = searchParams.get('tagType')
  const isValidFilterType =
    currentSearchParams === 'ALL' || currentSearchParams === 'FEATURED'

  const isActiveExplore = isExplorePage
    ? searchParams.get('tagType') === null || isValidFilterType
    : true

  return (
    <Menu>
      <MenuItem
        href={{ pathname: '/explore', query: { tagType: 'ALL' } }}
        title="Explore"
        prefix={<ExploreIcon />}
        isActive={pathname === '/explore' && isActiveExplore}
      />

      <MenuItem
        href={{ pathname: '/favorites', query: { order: 'NEWEST' } }}
        title="Favorites"
        prefix={<FavoriteIcon />}
        isActive={pathname === '/favorites'}
      />

      <MenuItem
        href={{ pathname: '/my-models' }}
        title="My Models"
        prefix={<MyModelsIcon />}
        isActive={pathname === '/my-models'}
      />
    </Menu>
  )
}
