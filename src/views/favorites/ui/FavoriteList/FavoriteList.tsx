'use client'

import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/shared/ui/card'

import { useGetFavoriteList } from './adapter'
import { LikeButton } from './ui/LikeButton'
import { Nullbox } from './ui/Nullbox'

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
  if (isFetching && !isFetchingNextPage) return <div>loading skeleton ...</div>

  const isEmpty = data?.pages[0].content.images.length === 0
  if (isEmpty) return <Nullbox />

  return (
    <>
      <div className="grid grid-cols-auto-fill-px gap-5">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.content.images.map((cardItem) => (
              <Card
                key={cardItem.encodedMainImageId}
                item={cardItem}
                actionSlot={<LikeButton item={cardItem} />}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {isFetching && isFetchingNextPage && (
        <div style={{ height: 100 }}>loading more items ...</div>
      )}
      <div ref={ref} style={{ height: 100 }} />
    </>
  )
}
