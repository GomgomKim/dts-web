interface VariationLoadingSkeletonProps {
  length?: number
}

export const VariationLoadingSkeleton = (
  props: VariationLoadingSkeletonProps
) => {
  if (!props.length)
    return (
      <div
        aria-disabled={true}
        className="relative aspect-[206/219] w-full overflow-hidden rounded-[0.5rem] border border-border"
      >
        <div className="loading-skeleton h-full" />
      </div>
    )

  return (
    <>
      {Array.from({ length: props.length }).map((_, index) => (
        <div
          key={index}
          aria-disabled={true}
          className="relative aspect-[206/219] w-full overflow-hidden rounded-[0.5rem] border border-border"
        >
          <div className="loading-skeleton h-full" />
        </div>
      ))}
    </>
  )
}
