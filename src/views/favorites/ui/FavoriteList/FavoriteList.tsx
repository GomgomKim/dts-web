'use client'

import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/shared/ui/Card'
import { CardSkeleton } from '@/shared/ui/Card/CardSkeleton'

import { v4 } from 'uuid'

import { useGetFavoriteList } from './model/adapter'
import { EmptyList } from './ui/EmptyList'
import { LikeButton } from './ui/LikeButton'
import { FavoriteListSkeleton } from './ui/Skeleton/FavoriteListSkeleton'

export const FavoriteList = () => {
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetFavoriteList()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage])

  if (status === 'error') return <p>{error?.message}</p>
  if (isFetching && !isFetchingNextPage) return <FavoriteListSkeleton />

  const isEmpty =
    data === undefined || data?.pages[0].content.images.length === 0
  if (isEmpty) return <EmptyList />

  return (
    <>
      <div className="grid-cols-auto-fill-small grid gap-5">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.content.images.map((cardItem) => (
              <Card
                key={cardItem.id + v4()}
                item={cardItem}
                actionSlot={<LikeButton item={cardItem} />}
              />
            ))}
          </Fragment>
        ))}
        {isFetching && isFetchingNextPage && (
          <>
            {Array.from({ length: 10 }).map((_value, idx) => (
              <CardSkeleton key={idx} isLoading />
            ))}
          </>
        )}
      </div>
      <div ref={ref} style={{ height: 100 }} />
    </>
  )
}
