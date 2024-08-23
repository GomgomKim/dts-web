'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/Banner'
import { CardList } from '@/features/explore/CardList'
import { Category } from '@/features/category'
import { TAG_TYPES } from '../constant'

function Explore() {
  return (
    <>
      <Banner />
      <Suspense fallback={<div>Loading...</div>}>
        <Category categoryList={TAG_TYPES} />
        <CardList />
      </Suspense>
    </>
  )
}
export default Explore
