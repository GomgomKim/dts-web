'use client'

import * as React from 'react'

import { useAiImageGeneratingStore } from '@/entities/generate/store'

import { Variation } from '@/shared/api/types'

import { NewGenerateButton } from './ui/NewGenerateButton'
import { Pagination } from './ui/Pagination'
import { VariationListSection } from './ui/VariationListSection'

interface VariationsProps {
  isLoading: boolean
  onDataLoaded: () => void
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
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem]">
            Variations
          </h3>
          {isAiImageGenerating || props.isLoading ? (
            <span className="text-primary text-[0.875rem] min-[3840px]:text-[1.25rem]">
              Generating...
            </span>
          ) : null}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>

      <div className="flex gap-4 min-h-[120px]">
        <VariationListSection
          onDataLoaded={props.onDataLoaded}
          onChangeSelectedVariation={props.onChangeSelectedVariation}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
          setTotalPage={setTotalPage}
        />
        {/* new generate button */}
        <NewGenerateButton disabled={props.isLoading} />
      </div>
    </div>
  )
}
