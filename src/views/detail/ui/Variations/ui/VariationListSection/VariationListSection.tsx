import * as React from 'react'

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
  const [amountPerPage, setAmountPerPage] = React.useState<number>(() => {
    if (window.innerWidth < 2560) return 3
    if (window.innerWidth < 3840) return 5
    return 7
  })

  const handleAmountPerPage = () => {
    if (window.innerWidth < 2560) setAmountPerPage(3)
    else if (window.innerWidth < 3840) setAmountPerPage(5)
    else setAmountPerPage(7)
  }
  React.useEffect(() => {
    window.addEventListener('resize', handleAmountPerPage)
    return () => window.removeEventListener('resize', handleAmountPerPage)
  })

  return (
    <React.Suspense
      fallback={<VariationListSkeleton amountPerPage={amountPerPage} />}
    >
      <VariationList {...props} amountPerPage={amountPerPage} />
    </React.Suspense>
  )
}
