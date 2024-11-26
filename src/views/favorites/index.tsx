import { Suspense } from 'react'

import { FavoriteList } from './ui/FavoriteList'
import { SortDropdown } from './ui/SortDropdown'

export default function Favorites() {
  return (
    <>
      <h1 className="mb-8 text-[2rem] font-semibold">Favorites</h1>
      <SortDropdown />
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteList />
      </Suspense>
    </>
  )
}
