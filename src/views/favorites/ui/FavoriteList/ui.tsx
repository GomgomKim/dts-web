'use client'

import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Nullbox } from '@/entities/Nullbox'

import { Card } from '@/shared/ui/card'

import { LikeButton } from './LikeButton'
import { useGetFavoriteList } from './adapter'

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

  const { ref, inView } = useInView({
    threshold: 1
  })

  useEffect(() => {
    if (inView) {
      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage])

  // TODO: null box di
  // if (isFetching && !isFetchingNextPage) return <div>loading skeleton ...</div>
  if (status === 'error') return <p>{error?.message}</p>

  const Grid = () => {
    return (
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
    )
  }

  const isEmpty = data?.pages[0].content.images.length === 0

  const renderContent = () => {
    if (isEmpty) return <Nullbox />
    if (isFetching && !isFetchingNextPage)
      return <div>loading skeleton ...</div>
    return <Grid />
  }

  return (
    <>
      {renderContent()}
      {isFetching && isFetchingNextPage && (
        <div style={{ height: 100 }}>loading more items ...</div>
      )}
      <div ref={ref} style={{ height: 100 }} />
    </>
  )
}
