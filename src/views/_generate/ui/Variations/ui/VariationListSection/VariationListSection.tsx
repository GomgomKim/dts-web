import { Suspense, useEffect, useState } from 'react'

import { Variation } from '@/shared/api/types'

import { VariationList, VariationListSkeleton } from './ui/VariationList'

interface VariationListSectionProps {
  onDataLoaded: () => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
  onChangeSelectedVariation: (variation: Variation) => void
}

export const VariationListSection = (props: VariationListSectionProps) => {
  const [amountPerPage, setAmountPerPage] = useState<number>(() => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 2560) return 3
    return 5
  })

  const handleAmountPerPage = () => {
    if (window.innerWidth < 2560) setAmountPerPage(3)
    else setAmountPerPage(5)
  }

  useEffect(() => {
    window.addEventListener('resize', handleAmountPerPage)
    return () => window.removeEventListener('resize', handleAmountPerPage)
  })

  return (
    <Suspense
      fallback={<VariationListSkeleton amountPerPage={amountPerPage} />}
    >
      <VariationList {...props} amountPerPage={amountPerPage} />
    </Suspense>
  )
}
