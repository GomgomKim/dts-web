'use client'

import * as React from 'react'

import { ErrorModals } from '@/entities/ErrorModal/ErrorModals'
import { useAiImageGeneratingStore } from '@/entities/generate/store'

import { Variation } from '@/shared/api/types'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'

import { NewGenerateButton } from './ui/NewGenerateButton'
import { Pagination } from './ui/Pagination'
import { VariationListSection } from './ui/VariationListSection'

interface VariationsProps {
  isLoading: boolean
  onDataLoaded: () => void
  onChangeSelectedVariation: (variation: Variation) => void
  onErrorGenerate: () => void
  onHoldingGenerate: () => void
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
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[0.875rem] text-neutral-7 2xl:text-[1.25rem]">
            Variations
          </h3>
          {isAiImageGenerating || props.isLoading ? (
            <span className="text-[0.875rem] text-primary 2xl:text-[1.25rem]">
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

      <div className="flex min-h-[120px] gap-4">
        <ErrorBoundary FallbackComponent={ErrorModals}>
          <VariationListSection
            onDataLoaded={props.onDataLoaded}
            onChangeSelectedVariation={props.onChangeSelectedVariation}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            setTotalPage={setTotalPage}
          />
        </ErrorBoundary>
        {/* new generate button */}
        <NewGenerateButton
          disabled={props.isLoading}
          onErrorGenerate={props.onErrorGenerate}
          onHoldingGenerate={props.onHoldingGenerate}
        />
      </div>
    </div>
  )
}
