import { Suspense } from 'react'

import { FavoriteItems } from './ui/favorite-items'
import { SortDropdown } from './ui/sort-dropdown'

export default function Favorites() {
  return (
    <>
      <h1 className="mb-8 text-[2rem] font-semibold">Favorites</h1>
      <SortDropdown />
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteItems />
      </Suspense>
    </>
  )
}
