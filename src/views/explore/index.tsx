'use client'

import * as React from 'react'

import { Filter } from '@/features/Filter'

import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'

import { Banner } from './ui/Banner'
import { ExploreList } from './ui/ExploreList'
import { FILTER_TYPES } from './ui/ExploreList/constant'

export default function Explore() {
  const { element, onMoveToElement } = useMoveScroll()
  return (
    <>
      <Banner onClickSeeExample={onMoveToElement} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className="mb-5">
          <Filter
            filterList={FILTER_TYPES}
            id="explore-filer"
            element={element}
            style={{ scrollMarginTop: '56px' }}
          />
        </div>
        <ExploreList />
      </React.Suspense>
    </>
  )
}
