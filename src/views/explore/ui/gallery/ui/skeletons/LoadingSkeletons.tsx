import { GalleryItemSkeleton } from '@/entities/gallery-item'

interface LoadingSkeletonsProps {
  isLoading: boolean
  count: number
}

export const LoadingSkeletons = (props: LoadingSkeletonsProps) => {
  if (!props.isLoading) return null

  return (
    <>
      {Array.from({ length: props.count }).map((_value, idx) => (
        <GalleryItemSkeleton key={idx} isLoading />
      ))}
    </>
  )
}
