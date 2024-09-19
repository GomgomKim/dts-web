import { Suspense } from 'react'

import { Filter } from '@/features/Filter'

import { FavoriteList } from './ui/FavoriteList'
import { FILTER_TYPES } from './ui/FavoriteList/constant'
import { SortDropdown } from './ui/SortDropdown'

export default function Favorites() {
  return (
    <>
      <h1 className="text-xl mb-8 text-2xl font-semibold">Favorites</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-between mb-5">
          <Filter filterList={FILTER_TYPES} />
          <SortDropdown />
        </div>
        <FavoriteList />
      </Suspense>
    </>
  )
}
