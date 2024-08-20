import { FavoriteList } from '@/features/favorites/favorites-list'
import { Suspense } from 'react'

function Favorites() {
  return (
    <>
      <h1 className="text-xl mb-8 text-2xl font-semibold">Favorites</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteList />
      </Suspense>
    </>
  )
}
export default Favorites
