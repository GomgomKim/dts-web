'use client'

import { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/shared/ui/card'

import { v4 } from 'uuid'

import { useGetExploreList } from './model/adapter'
import { LikeButton } from './ui/LikeButton'

export const ExploreList = () => {
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetExploreList()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage])

  if (isFetching && !isFetchingNextPage) return <p>loading</p>
  if (status === 'error') return <p>{error?.message}</p>

  const isEmpty = data?.pages[0].content.images.length === 0
  if (isEmpty) return <p>no data</p>

  return (
    <>
      <div className="grid grid-cols-auto-fill-small min-[3200px]:grid-cols-auto-fill-medium min-[3840px]:grid-cols-auto-fill-large gap-5">
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
      </div>
      {isFetching && isFetchingNextPage && (
        <div style={{ height: 100 }}>loading more models ...</div>
      )}
      <div ref={ref} style={{ height: 100 }} />
    </>
  )
}
