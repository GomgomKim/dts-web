import { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { useGetExploreImages } from '@/features/explore/card-list/adapter'
import { URL_EXPLORE_LIST_IMAGE } from '@/features/explore/card-list/constant'
import { Card } from '@/shared/ui/card'

const TAG_TYPES = ['FEATURED', 'MAKEUP', 'SKINCARE', 'HAIR']

export const CardList = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetExploreImages(params.get('tagType') || TAG_TYPES[0])

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
            <div key={cardItem.id}>
              <Card
                imgUrl={
                  process.env.NEXT_PUBLIC_API_URL +
                  `${URL_EXPLORE_LIST_IMAGE}/` +
                  cardItem.path
                }
                id={cardItem.id.toString()}
              />
            </div>
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
