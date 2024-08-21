import { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { useGetExploreImages } from '@/features/explore/CardList/adapter'
import { Card } from '@/shared/ui/card'
import { LikeButton } from '@/features/explore/LikeButton'

const TAG_TYPES = ['FEATURED', 'MAKEUP', 'SKINCARE', 'HAIR']

export const CardList = () => {
  const searchParams = useSearchParams()
  // const params = new URLSearchParams(searchParams)

  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetExploreImages(searchParams.get('tagType') || TAG_TYPES[0])

  const { ref, inView } = useInView({
    threshold: 1
  })

  useEffect(() => {
    if (inView) {
      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage])

  if (isFetching && !isFetchingNextPage) return <p>loading</p>
  if (status === 'error') return <p>{error?.message}</p>

  const renderCard = () => {
    if (data?.pages[0]?.content.images.length === 0) {
      return <p>no data</p>
    } else {
      return data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.content.images.map((cardItem) => (
            <Card
              key={cardItem.encodedBaseImageId}
              item={cardItem}
              actionSlot={
                <LikeButton
                  id={cardItem.encodedBaseImageId}
                  isFavorite={cardItem.isFavorite}
                />
              }
            />
          ))}
        </Fragment>
      ))
    }
  }

  return (
    <>
      <div className="grid grid-cols-auto-fill-px gap-5">{renderCard()}</div>
      {isFetching && isFetchingNextPage && (
        <div style={{ height: 100 }}>loading more models ...</div>
      )}
      <div ref={ref} style={{ height: 100 }} />
    </>
  )
}
