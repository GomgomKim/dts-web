interface CardSkeletonProps {
  isLoading?: boolean
}

export const CardSkeleton = (props: CardSkeletonProps) => {
  return (
    <div
      className={`relative aspect-[9/16] rounded-[8px] bg-neutral-1 overflow-hidden ${props.isLoading ? 'loading-skeleton' : ''}`}
    ></div>
  )
}
