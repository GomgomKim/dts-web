'use client'

import { Fragment, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/shared/ui/card'
import { CardSkeleton } from '@/shared/ui/card/CardSkeleton'

import { useGetExploreList } from './model/adapter'
import { LikeButton } from './ui/LikeButton'

const NUM_OF_DATA_PER_REQUEST = 25
const MAX_NULL_BOX_LENGTH = 50

export const ExploreList = () => {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetExploreList()

  const { ref, inView } = useInView({
    threshold: 0.5
  })

  useEffect(() => {
    if (inView) {
      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage])

  const totalCardItems = useMemo(
    () =>
      data?.pages.reduce((total, page) => {
        return total + page.content.images.length
      }, 0),
    [data]
  )

  // if (status === 'error') return <p>{error?.message}</p>
  if (isFetching && !isFetchingNextPage)
    return (
      <div className="grid grid-cols-auto-fill-small 2xl:grid-cols-auto-fill-large gap-5">
        {Array.from({ length: NUM_OF_DATA_PER_REQUEST }).map((_value, idx) => (
          <CardSkeleton key={'loading' + idx} isLoading />
        ))}
        {Array.from({
          length: MAX_NULL_BOX_LENGTH - NUM_OF_DATA_PER_REQUEST
        }).map((_value, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    )

  const isEmpty = data?.pages[0].content.images.length === 0
  if (isEmpty) return <p>no data</p>

  const totalItems = totalCardItems || 0 // totalCardItems가 없으면 0
  const differenceFrom50 = Math.abs(MAX_NULL_BOX_LENGTH - totalItems) // 50과의 차이 절대값
  const fetchAdjustment =
    isFetching && isFetchingNextPage ? NUM_OF_DATA_PER_REQUEST : 0 // 페칭 중일 때 25 추가
  const isMultipleOf50 =
    totalItems % MAX_NULL_BOX_LENGTH === 0 ? MAX_NULL_BOX_LENGTH : 0 // 50의 배수이면 50 추가

  const nullBoxLength = Math.abs(
    differenceFrom50 - fetchAdjustment + isMultipleOf50
  )

  return (
    <>
      <div className="grid grid-cols-auto-fill-small min-[3200px]:grid-cols-auto-fill-medium 2xl:grid-cols-auto-fill-large gap-5">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.content.images.map((cardItem, cardIdx) => {
              const isLastItem =
                i * NUM_OF_DATA_PER_REQUEST + (cardIdx + 1) === totalCardItems
              return (
                <Card
                  key={cardItem.id}
                  item={cardItem}
                  actionSlot={<LikeButton item={cardItem} />}
                  inViewRef={!isFetching && isLastItem ? ref : undefined}
                />
              )
            })}
          </Fragment>
        ))}
        {isFetching && isFetchingNextPage && (
          <>
            {Array.from({ length: NUM_OF_DATA_PER_REQUEST }).map(
              (_value, idx) => (
                <CardSkeleton key={idx} isLoading />
              )
            )}
          </>
        )}
        {hasNextPage && (
          <>
            {Array.from({ length: nullBoxLength }).map((_value, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
