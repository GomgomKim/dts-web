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
      <Suspense fallback={<div>Loading...</div>}>
        <CardList />
      </Suspense>
    </>
  )
}
export default Explore
