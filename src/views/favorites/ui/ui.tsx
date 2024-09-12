import { Suspense } from 'react'
import { Category } from '@/features/category'
import { FavoriteList } from '@/features/favorites/FavoriteList'
import { FILTER_TYPES } from '@/features/favorites/FavoriteList/constant'
import { SortDropdown } from '@/features/favorites/SortDropdown'

function Favorites() {
  return (
    <>
      <h1 className="text-xl mb-8 text-2xl font-semibold">Favorites</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-between mb-5">
          <Category categoryList={FILTER_TYPES} />
          <SortDropdown />
        </div>
        <FavoriteList />
      </Suspense>
    </>
  )
}
export default Favorites
