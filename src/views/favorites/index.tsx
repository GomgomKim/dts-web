import { Suspense } from 'react'

import { FavoriteItems } from './ui/favorite-items'
import { SortDropdown } from './ui/sort-dropdown'

export default function Favorites() {
  return (
    <>
      <h1 className="mb-5 h-[2.375rem] text-[1.25rem] font-semibold lg:mb-8 lg:text-[2rem]">
        Favorites
      </h1>
      <SortDropdown />
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteItems />
      </Suspense>
    </>
  )
}
