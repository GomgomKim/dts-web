'use client'

import { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/shared/ui/card'
import { useGetFavoriteList } from './adapter'
import { Nullbox } from '@/entities/favorites/ui/Nullbox'
import { TAG_TYPES } from './constant'
import { Category } from '@/features/category'
import { LikeButton } from '../LikeButton'

export const FavoriteList = () => {
  const searchParams = useSearchParams()

  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetFavoriteList(searchParams.get('tagType') || TAG_TYPES[0])

  const { ref, inView } = useInView({
    threshold: 1
  })

  useEffect(() => {
    if (inView) {
      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage])

  // TODO: null box di
  if (isFetching && !isFetchingNextPage) return <div>loading skeleton ...</div>
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
    return isEmpty ? (
      <Nullbox />
    ) : (
      <>
        <Category categoryList={TAG_TYPES} />
        <Grid />
      </>
    )
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
