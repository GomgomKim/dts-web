'use client'

import * as React from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { URL_VARIATION_IMAGE } from '@/entities/detail/constant'
import { useAiImageGeneratingStore } from '@/entities/detail/store'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import AngleBracketIcon from '/public/icons/angle-bracket-open.svg'
import DashedSvg from '/public/icons/dashed.svg'
import EditIcon from '/public/icons/edit.svg'

import { v4 } from 'uuid'

import { useEditorStore } from '../../model/useEditorHistoryStore'
import { useGetAiImageProgress, useGetVariationList } from './model/adapter'
import { NewGenerateButton } from './ui/NewGenerateButton'

interface VariationListProps {
  onChangeSelectedVariation: (variation: Variation) => void
}

const AMOUNT_PER_PAGE = 3
const INITIAL_PAGE = 1

export const VariationsList = (props: VariationListProps) => {
  const searchParams = useSearchParams()
  const mainImageId = searchParams.get('id') || ''

  const editedVariationList = useEditorStore((state) => state.items)

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
    data: { variations }
  } = useGetVariationList(mainImageId)
  const queries = useGetAiImageProgress()

  const [initialData, setInitialData] = React.useState<Variation[]>([])

  const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_PAGE)
  const [totalPages, setTotalPages] = React.useState<number>(() => {
    return Math.ceil(variations.length / AMOUNT_PER_PAGE)
  })

  React.useEffect(() => {
    props.onChangeSelectedVariation(variations[0])

    // polling 할 목록 따로 추출
    const successGeneratingList: Variation[] = []
    const newGeneratingList: Variation[] = []
    for (let i = 0; i < variations.length; i++) {
      const variation = variations[i]

      if (!variation.isAiGenerated || variation.progress >= 100) {
        successGeneratingList.push(variation)
        continue
      }
      newGeneratingList.push(variation)
    }

    setInitialData(successGeneratingList)

    if (newGeneratingList.length > 0) {
      setIsAiImageGenerating(true) // false 처리는 polling 완료시
      setCurrentPage(totalPages)

      addAiImageGeneratingList(newGeneratingList)
      setAiImageList(newGeneratingList)
    }
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

    if (query.data?.content.variation.progress === 100) {
      const { variationId } = query.data.content.variation
      removeAiImageGeneratingList(variationId)
      updateAiImageItem(query.data?.content.variation)
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

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-neutral-7 text-[0.875rem]">Variations</h3>
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

      <div className="flex gap-2 min-h-[120px]">
        {/*  */}
        {renderData.map((item) => {
          const { variationId, isAiGenerated, progress } = item

          const isGenerating = isAiGenerated && progress < 100
          const isSeletedVariation =
            searchParams.get('variationId') === variationId.toString()

          const isEdited = editedVariationList.has(variationId.toString())

          let imgUrl = ''

          if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
            imgUrl = item.images[0]?.encryptedImageUrl
          } else {
            imgUrl =
              process.env.NEXT_PUBLIC_API_URL +
              `${URL_VARIATION_IMAGE}` +
              item.images[0]?.encryptedImageUrl
          }

          return (
            <div
              key={variationId + v4()}
              aria-disabled={isGenerating}
              className={cn(
                'rounded-[0.5rem] overflow-hidden relative aspect-[206/219] w-full border border-border',
                {
                  'cursor-pointer': !isGenerating,
                  'pointer-events-none': isGenerating,
                  'opacity-50': !isSeletedVariation
                }
              )}
              onClick={() => props.onChangeSelectedVariation(item)}
            >
              {isGenerating ? (
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
              {isEdited ? (
                <div className="p-[6px] absolute top-[6px] left-[6px] rounded-[4px] bg-neutral-0 bg-opacity-90">
                  <EditIcon />
                </div>
              ) : null}
            </div>
          )
        })}
        {/* null card */}
        {renderData.length < AMOUNT_PER_PAGE &&
          Array.from({
            length: AMOUNT_PER_PAGE - renderData.length
          }).map((_, index) => (
            <div
              key={index}
              className="rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden"
            >
              <DashedSvg />
            </div>
          ))}
        {/* new generate button */}
        <NewGenerateButton />
      </div>
    </>
  )
}
