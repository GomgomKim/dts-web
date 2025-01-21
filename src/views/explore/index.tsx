'use client'

import { FilterTagTypes } from '@/features/filter-tag-types'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'
import { ErrorBoundary } from '@/shared/ui/error-boundary'

import { CallToActionButtons } from './ui/call-to-action-buttons'
import { Gallery } from './ui/gallery'
import { TAG_TYPES } from './ui/gallery/constant'

export default function Explore() {
  useGetAuthToken({
    redirectUri: 'explore'
  })

  const { element, onMoveToElement } = useMoveScroll()
  return (
    <>
      <CallToActionButtons onClickSeeExample={onMoveToElement} />
      <div className="m-auto min-h-[calc(100vh-56px-341px)] max-w-[1136px] pb-5 md:min-h-[calc(100vh-56px-320px)] min-[3200px]:max-w-[1646px] 2xl:max-w-[2184px]">
        <div className="mb-5 scroll-mt-[56px]" ref={element}>
          <FilterTagTypes id="explore-filter" filterList={TAG_TYPES} />
        </div>
        <ErrorBoundary FallbackComponent={({ error }) => <>{error?.message}</>}>
          <Gallery />
        </ErrorBoundary>
      </div>
    </>
  )
}
