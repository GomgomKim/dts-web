'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/Banner'
import { CardList } from '@/features/explore/CardList'
import { Category } from '@/features/category'
import { FILTER_TYPES } from '@/features/favorites/FavoriteList/constant'
import * as React from 'react'

function Explore() {
  return (
    <>
      <Banner />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mb-5">
          <Category categoryList={FILTER_TYPES} />
        </div>
        <CardList />
      </Suspense>
    </>
  )
}
export default Explore
