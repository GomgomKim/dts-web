'use client'

import * as React from 'react'

import { Filter } from '@/features/Filter'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'

import { CallToActionButtons } from './ui/CallToActionButtons/CallToActionButtons'
import { ExploreList } from './ui/ExploreList'
import { FILTER_TYPES } from './ui/ExploreList/constant'

export default function Explore() {
  useGetAuthToken({ redirectPath: '/explore?filterType=ALL' })

  const { element, onMoveToElement } = useMoveScroll()
  return (
    <>
      <CallToActionButtons onClickSeeExample={onMoveToElement} />
      <div className="min-h-screen max-w-[1136px] min-[3200px]:max-w-[1646px] min-[3840px]:max-w-[2184px] m-auto pb-[160px]">
        <div className="mb-5 scroll-mt-[56px]" ref={element}>
          <Filter id="explore-filter" filterList={FILTER_TYPES} />
        </div>
        <ExploreList />
      </div>
    </>
  )
}
