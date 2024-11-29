'use client'

import { Filter } from '@/features/filter'

import { useGetAuthToken } from '@/shared/lib/hooks/useGetAuthToken'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'
import { ErrorBoundary } from '@/shared/ui/error-boundary'

import { CallToActionButtons } from './ui/call-to-action-buttons'
import { Gallery } from './ui/gallery'
import { FILTER_TYPES } from './ui/gallery/constant'

export default function Explore() {
  useGetAuthToken({
    redirectPath: '/explore?filterType=ALL',
    redirectUri: 'explore'
  })

  const { element, onMoveToElement } = useMoveScroll()
  return (
    <>
      <CallToActionButtons onClickSeeExample={onMoveToElement} />
      <div className="m-auto min-h-[calc(100vh-56px-341px)] max-w-[1136px] pb-5 md:min-h-[calc(100vh-56px-320px)] min-[3200px]:max-w-[1646px] 2xl:max-w-[2184px]">
        <div className="mb-5 scroll-mt-[56px]" ref={element}>
          <Filter id="explore-filter" filterList={FILTER_TYPES} />
        </div>
        <ErrorBoundary FallbackComponent={({ error }) => <>{error?.message}</>}>
          <Gallery />
        </ErrorBoundary>
      </div>
    </>
  )
}
