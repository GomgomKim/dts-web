import { VariationEmpty } from './ui/VariationEmpty'
import { VariationLoadingSkeleton } from './ui/VariationLoadingSkeleton'

export const VariationListSkeleton = ({
  amountPerPage
}: {
  amountPerPage: number
}) => {
  return (
    <>
      <VariationLoadingSkeleton length={3} />
      <VariationEmpty length={amountPerPage - 3} />
    </>
  )
}
