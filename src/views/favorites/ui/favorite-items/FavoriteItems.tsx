'use client'

import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { GalleryItem, GalleryItemSkeleton } from '@/entities/gallery-item'

import { v4 } from 'uuid'

import { useGetFavoriteList } from './model/adapter'
import { EmptyItems } from './ui/empty-items'
import { FavoriteItemsSkeleton } from './ui/favorite-items-skeleton/FavoriteItemsSkeleton'
import { LikeButton } from './ui/like-button'

export const FavoriteItems = () => {
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
  if (isFetching && !isFetchingNextPage) return <FavoriteItemsSkeleton />

  const isEmpty =
    data === undefined || data?.pages[0].content.images.length === 0
  if (isEmpty) return <EmptyItems />

  return (
    <>
      <div className="grid-cols-auto-fill-small md:grid-cols-auto-fill-medium grid gap-5">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.content.images.map((cardItem) => (
              <GalleryItem
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
              <GalleryItemSkeleton key={idx} isLoading />
            ))}
          </>
        )}
      </div>
      <div ref={ref} style={{ height: 100 }} />
    </>
  )
}
