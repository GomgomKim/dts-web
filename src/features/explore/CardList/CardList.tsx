import { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useGetExploreImages } from '@/features/explore/CardList/CardList.adapter'
import { URL_EXPLORE_LIST_IMAGE } from '@/features/explore/CardList/CardList.constant'
import { Card } from '@/features/Card'
import { useInView } from 'react-intersection-observer'

const TAG_TYPES = ['FEATURED', 'MAKEUP', 'SKINCARE', 'HAIR']

export const CardList = () => {
  const searchParams = useSearchParams()

  const { data, isFetching, isError, hasNextPage, fetchNextPage } =
    useGetExploreImages(TAG_TYPES[0], searchParams.get('scrollKey'))

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  })

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  if (isFetching) return 'loading...'
  if (isError) return 'error!'

  return (
    <>
      {data?.pages.map((page, i) => (
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
      ))}
      <div ref={ref} style={{ height: 0 }} />
    </>
  )
}
