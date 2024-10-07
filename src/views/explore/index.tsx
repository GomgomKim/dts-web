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
      <div className="max-w-[1136px] min-[3200px]:max-w-[1646px] min-[3840px]:max-w-[2184px] m-auto">
        <div className="mb-5">
          <Filter
            id="explore-filer"
            filterList={FILTER_TYPES}
            style={{ scrollMarginTop: '56px' }}
            element={element}
            onClickFilter={onMoveToElement}
          />
        </div>
        <ExploreList />
      </div>
    </>
  )
}
