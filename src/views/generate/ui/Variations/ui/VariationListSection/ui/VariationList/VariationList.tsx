'use client'

import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import { useAiImageGeneratingStore } from '@/entities/generate/store'

import { Variation } from '@/shared/api/types'

import {
  useGetAiImageProgress,
  useGetVariationList
} from '../../../../model/adapter'
import { VariationItem } from './ui'
import { VariationEmpty } from './ui/VariationEmpty'

interface VariationListProps {
  amountPerPage: number
  onDataLoaded: () => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
  onChangeSelectedVariation: (variation: Variation) => void
}

export const VariationList = (props: VariationListProps) => {
  const searchParams = useSearchParams()
  const mainImageId = searchParams.get('id') || ''

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
  const { resetAiImageGeneratingList } = useAiImageGeneratingStore.getState()

  const {
    data: { variations },
    isFetching,
    isError,
    error
    // isSuccess
  } = useGetVariationList(mainImageId)
  const queries = useGetAiImageProgress(mainImageId)

  const [initialData, setInitialData] = React.useState<Variation[]>([])

  React.useEffect(() => {
    return () => resetAiImageGeneratingList()
  }, [variations])

  // 페이지당 아이템 수 변경
  React.useEffect(() => {
    const totalPage = Math.ceil(variations.length / props.amountPerPage)

    props.setTotalPage(totalPage)
    if (totalPage < props.currentPage) props.setCurrentPage(totalPage)
  }, [variations, props.amountPerPage])

  React.useEffect(() => {
    if (isFetching) return

    props.onChangeSelectedVariation(variations[0])
    props.onDataLoaded()

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
      props.setCurrentPage(props.totalPage)

      addAiImageGeneratingList(newGeneratingList)
      setAiImageList(newGeneratingList)
    }
  }, [variations, isFetching])

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i]

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
    const updatePage = Math.ceil(variationsLength / props.amountPerPage)
    props.setCurrentPage(updatePage)
  }, [variationsLength])

  if (variationsLength > props.totalPage * props.amountPerPage) {
    const updatePage = Math.ceil(variationsLength / props.amountPerPage)
    props.setTotalPage(updatePage)
  }

  const renderData = [...initialData, ...aiImageList].slice(
    (props.currentPage - 1) * props.amountPerPage,
    (props.currentPage - 1) * props.amountPerPage + props.amountPerPage
  )

  if (isError) return <div>{error?.message}</div>

  return (
    <>
      {renderData.map((item) => (
        <VariationItem
          key={item.variationId}
          item={item}
          onClickVariation={() => props.onChangeSelectedVariation(item)}
        />
      ))}
      {/* null card */}
      {renderData.length < props.amountPerPage && (
        <VariationEmpty
          length={
            props.amountPerPage - renderData.length - (isFetching ? 3 : 0)
          }
        />
      )}
    </>
  )
}
