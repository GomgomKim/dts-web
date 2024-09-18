'use client'

import * as React from 'react'
import Image from 'next/image'
import AngleBracketIcon from '/public/icons/angle-bracket-open.svg'
import { Button } from '@/shared/ui'
import { FaceAngle, Variation } from '@/shared/api/types'
import {
  ASPECT_RATIO_REVERT_MAP,
  URL_VARIATION_LIST_IMAGE
} from '@/entities/detail/constant'
import {
  useGetAiImageProgress,
  useGetVariationImages,
  usePostAiImageGenerate
} from '@/entities/detail/adapter'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { useAiImageGeneratingStore } from '@/features/detail/store'
import { useAuthStore } from '@/entities/user/store'
import AlertCircleIcon from '/public/icons/alert-circle.svg'

import { v4 } from 'uuid'

interface VariationsSectionProps {
  handleSelectedVariation: (variation: Variation) => void
}

const AMOUNT_PER_PAGE = 4
const INITIAL_PAGE = 1

// const dummy: Variation[] = [
//   {
//     encodedAiBasedImageId: 'MTk=',
//     encodedBaseImageId: '',
//     properties: {
//       aspectRatio: 'ASPECT_RATIO_1_1',
//       faceAngle: 'FRONT'
//     },
//     progress: 0,
//     isAiGenerated: true,
//     isFail: true,
//     isTimeout: true
//   }
// ]

export const VariationsSection = ({
  handleSelectedVariation
}: VariationsSectionProps) => {
  const searchParams = useSearchParams()
  const encodedBaseImageInfoId = searchParams.get('id') || ''
  const isAiImageFailed = useAiImageGeneratingStore(
    (state) => state.isAiImageFailed
  )
  const setIsAiImageFailed = useAiImageGeneratingStore(
    (state) => state.setIsAiImageFailed
  )
  const isAiImageGenerating = useAiImageGeneratingStore(
    (state) => state.isAiImageGenerating
  )
  const setIsAiImageGenerating = useAiImageGeneratingStore(
    (state) => state.setIsAiImageGenerating
  )
  const aiImageList = useAiImageGeneratingStore((state) => state.aiImageList)
  const setAiImageList = useAiImageGeneratingStore(
    (state) => state.setAiImageList
  )
  const addAiImageItem = useAiImageGeneratingStore(
    (state) => state.addAiImageItem
  )
  const updateAiImageItem = useAiImageGeneratingStore(
    (state) => state.updateAiImageItem
  )
  const aiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.aiImageGeneratingList
  )
  const addAiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.addAiImageGeneratingList
  )
  const removeAiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.removeAiImageGeneratingList
  )

  const {
    data: { mainImageIndex, variations }
  } = useGetVariationImages(encodedBaseImageInfoId)
  const queries = useGetAiImageProgress()

  const postAiImageMutaion = usePostAiImageGenerate()

  const setRestriction = useAuthStore((state) => state.setRestriction)

  const [initialData, setInitialData] = React.useState<Variation[]>([])

  const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_PAGE)
  const [totalPages, setTotalPages] = React.useState<number>(() => {
    return Math.ceil(variations.length / AMOUNT_PER_PAGE)
  })

  React.useEffect(() => {
    handleSelectedVariation(variations[mainImageIndex])

    // polling 할 목록 따로 추출
    const successGeneratingList: Variation[] = []
    const newGeneratingList: Variation[] = []
    // const failGeneratingList: Variation[] = []
    for (let i = 0; i < variations.length; i++) {
      const variation = variations[i]

      if (!variation.isAiGenerated || variation.progress >= 100) {
        successGeneratingList.push(variation)
        continue
      }
      // if (variation.isFail) {
      //   failGeneratingList.push(variation)
      //   continue
      // }
      newGeneratingList.push(variation)
    }

    setInitialData(successGeneratingList)

    if (newGeneratingList.length > 0) {
      setIsAiImageGenerating(true) // false 처리는 polling 완료시
      setCurrentPage(totalPages)

      addAiImageGeneratingList(newGeneratingList)
      setAiImageList(newGeneratingList)
    }

    // if (failGeneratingList.length > 0) {
    //   setIsAiImageFailed(true)
    //   // console.log('에러 발생한 목록', failGeneratingList)
    // }
  }, [])

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i]
    console.log('query', query)

    if (query.isLoading) {
      console.log('로딩중')
      continue
    }

    if (query.isError) {
      console.log('에러 발생')
      continue
    }

    if (query.data?.content.variation.isFail) {
      // console.log('isFail', query.data?.content)

      // TODO: 에러 발생시 처리
      const { encodedBaseImageId } = query.data.content.variation
      setIsAiImageFailed(true)
      removeAiImageGeneratingList(encodedBaseImageId)
      updateAiImageItem(query.data?.content.variation)
      continue
    }

    if (query.data?.content.variation.progress === 100) {
      // console.log('생성 완료!', query.data?.content)

      const { encodedBaseImageId } = query.data.content.variation
      removeAiImageGeneratingList(encodedBaseImageId)
      updateAiImageItem(query.data?.content.variation)
      // TODO: 업데이트되고 다음 렌더링때 이미지가 반영되는 이슈
    }
  }

  if (aiImageGeneratingList.length === 0) setIsAiImageGenerating(false)
  else setIsAiImageGenerating(true)

  const variationsLength = initialData.length + aiImageList.length

  React.useEffect(() => {
    if (variationsLength === 0 || variationsLength === variations.length) return
    const updatePage = Math.ceil(variationsLength / AMOUNT_PER_PAGE)
    setCurrentPage(updatePage)
  }, [variationsLength])

  if (variationsLength > totalPages * AMOUNT_PER_PAGE) {
    const updatePage = Math.ceil(variationsLength / AMOUNT_PER_PAGE)
    setTotalPages(updatePage)
  }

  const renderData = [...initialData, ...aiImageList].slice(
    (currentPage - 1) * AMOUNT_PER_PAGE,
    (currentPage - 1) * AMOUNT_PER_PAGE + AMOUNT_PER_PAGE
  )

  const handleClickRetryButton = ({ item }: { item: Variation }) => {
    const {
      encodedBaseImageId,
      properties: { aspectRatio, faceAngle }
    } = item

    removeAiImageGeneratingList(encodedBaseImageId)

    postAiImageMutaion.mutate(
      {
        encodedBaseImageId,
        properties: {
          aspectRatio: ASPECT_RATIO_REVERT_MAP[aspectRatio],
          faceAngle: faceAngle as FaceAngle
        }
      },
      {
        onSuccess: (data) => {
          const { variation, restriction } = data.content

          addAiImageGeneratingList([variation])
          addAiImageItem(variation)

          setRestriction(restriction)
        }
      }
      // onError
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-neutral-7 text-[0.875rem]">Variations</h3>
          {isAiImageFailed ? <AlertCircleIcon /> : null}
          {isAiImageGenerating ? (
            <span className="text-primary text-[0.875rem]">Generating ...</span>
          ) : null}
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
            disabled={currentPage === INITIAL_PAGE}
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, INITIAL_PAGE))
            }
          >
            <AngleBracketIcon />
          </Button>
          <div className="flex items-center text-center text-neutral-5">
            <span className="block w-[25px]">{currentPage}</span>
            <span> / </span>
            <span className="block w-[25px]">{totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <AngleBracketIcon className="rotate-180" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 min-h-[120px] h-">
        {/*  */}
        {renderData.map((item) => {
          const {
            encodedAiBasedImageId,
            encodedBaseImageId,
            isAiGenerated,
            progress,
            isFail
          } = item

          const isGenerating = isAiGenerated && progress < 100
          const isSeletedVariation =
            searchParams.get('variation') === encodedBaseImageId

          const imgUrl =
            process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
              ? item.encryptedImageUrl
              : process.env.NEXT_PUBLIC_API_URL +
                `${URL_VARIATION_LIST_IMAGE}` +
                item.encryptedImageUrl

          return (
            <div
              key={encodedAiBasedImageId + encodedBaseImageId + progress + v4()}
              aria-disabled={isGenerating}
              className={cn(
                'rounded-[0.5rem] overflow-hidden relative aspect-[206/219] w-full border border-border',
                {
                  'cursor-pointer': !isGenerating,
                  'pointer-events-none': isGenerating,
                  'opacity-50': !isSeletedVariation && !isFail
                }
              )}
              onClick={() => handleSelectedVariation(item)}
            >
              {isFail ? (
                // fail card
                <div className="p-[8px] absolute inset-0">
                  <Image
                    src={imgUrl}
                    alt=""
                    fill
                    style={{
                      objectFit: 'cover',
                      filter: 'blur(1px)'
                    }}
                  />
                  <div className="absolute inset-0 bg-[#FF8480] bg-opacity-20" />
                  <div className="relative h-full">
                    <Button
                      variant="outline"
                      className="absolute bottom-0 rounded-[8px] py-[8px] w-full mt-auto text-white text-[12px] z-20 pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClickRetryButton({ item })
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : isGenerating ? (
                // generating skeleton card
                <div className="loading-skeleton h-full" />
              ) : (
                // normal card
                <Image
                  src={imgUrl}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          )
        })}
        {/* null card */}
        {renderData.length < AMOUNT_PER_PAGE &&
          Array.from({ length: AMOUNT_PER_PAGE - renderData.length }).map(
            (_, index) => (
              <div
                // Key 변경
                key={index}
                className="border border-dashed rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 opacity-50"
              ></div>
            )
          )}
      </div>
    </>
  )
}
