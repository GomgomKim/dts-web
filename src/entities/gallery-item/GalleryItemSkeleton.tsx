interface GalleryItemSkeletonProps {
  isLoading?: boolean
}

export const GalleryItemSkeleton = (props: GalleryItemSkeletonProps) => {
  return (
    <div
      className={`relative aspect-[9/16] overflow-hidden rounded-[8px] bg-neutral-1 ${props.isLoading ? 'loading-skeleton' : ''}`}
    ></div>
  )
}
