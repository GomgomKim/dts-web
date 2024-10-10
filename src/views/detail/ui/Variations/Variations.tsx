'use client'

import * as React from 'react'

import { useAiImageGeneratingStore } from '@/entities/detail/store'

import { Variation } from '@/shared/api/types'

import { NewGenerateButton } from './ui/NewGenerateButton'
import { Pagination } from './ui/Pagination'
import { VariationList } from './ui/VariationList'

interface VariationsProps {
  onChangeSelectedVariation: (variation: Variation) => void
}

const INITIAL_PAGE = 1

export const Variations = (props: VariationsProps) => {
  const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_PAGE)
  const [totalPage, setTotalPage] = React.useState<number>(INITIAL_PAGE)

  const isAiImageGenerating = useAiImageGeneratingStore(
    (state) => state.isAiImageGenerating
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
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>

      <div className="flex gap-4 min-h-[120px]">
        <React.Suspense fallback="loading...">
          <VariationList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            setTotalPage={setTotalPage}
            onChangeSelectedVariation={props.onChangeSelectedVariation}
          />
          {/* new generate button */}
          <NewGenerateButton />
        </React.Suspense>
      </div>
    </>
  )
}
