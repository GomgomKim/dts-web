'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/Banner'
import { CardList } from '@/features/explore/CardList'
import { Catergory } from '@/features/explore/Category'

function Explore() {
  return (
    <>
      <Banner />
      <Catergory />
      <div className="grid grid-cols-auto-fill-px gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          <CardList />
        </Suspense>
      </div>
    </>
  )
}
export default Explore
