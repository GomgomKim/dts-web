'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/banner'
import { CardList } from '@/features/explore/card-list'
import { Catergory } from '@/features/explore/category'

function Explore() {
  return (
    <>
      <Banner />
      <Catergory />
      <Suspense fallback={<div>Loading...</div>}>
        <CardList />
      </Suspense>
    </>
  )
}
export default Explore
