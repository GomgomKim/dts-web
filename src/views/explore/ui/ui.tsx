'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/Banner'
import { CardList } from '@/features/explore/CardList'
import { Category } from '@/features/category'
import { FILTER_TYPES } from '@/features/favorites/FavoriteList/constant'
import * as React from 'react'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'

export default function Explore() {
  const { element, onMoveToElement } = useMoveScroll()
  return (
    <>
      <Banner onClickSeeExample={onMoveToElement} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mb-5">
          <Category
            categoryList={FILTER_TYPES}
            id="explore-filer"
            element={element}
            style={{ scrollMarginTop: '56px' }}
          />
        </div>
        <CardList />
      </Suspense>
    </>
  )
}
