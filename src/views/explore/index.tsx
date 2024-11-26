'use client'

import { Filter } from '@/features/Filter'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'

import { CallToActionButtons } from './ui/CallToActionButtons'
import { ExploreList } from './ui/ExploreList'
import { FILTER_TYPES } from './ui/ExploreList/constant'

export default function Explore() {
  useGetAuthToken({
    redirectPath: '/explore?filterType=ALL',
    redirectUri: 'explore'
  })

  const { element, onMoveToElement } = useMoveScroll()
  return (
    <>
      <CallToActionButtons onClickSeeExample={onMoveToElement} />
      <div className="m-auto min-h-screen max-w-[1136px] pb-[160px] min-[3200px]:max-w-[1646px] 2xl:max-w-[2184px]">
        <div className="mb-5 scroll-mt-[56px]" ref={element}>
          <Filter id="explore-filter" filterList={FILTER_TYPES} />
        </div>
        <ErrorBoundary FallbackComponent={({ error }) => <>{error?.message}</>}>
          <ExploreList />
        </ErrorBoundary>
      </div>
    </>
  )
}
