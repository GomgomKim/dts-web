import { CardSkeleton } from '@/shared/ui'

interface LoadingSkeletonsProps {
  isLoading: boolean
  count: number
}

export const LoadingSkeletons = (props: LoadingSkeletonsProps) => {
  if (!props.isLoading) return null

  return (
    <>
      {Array.from({ length: props.count }).map((_value, idx) => (
        <CardSkeleton key={idx} isLoading />
      ))}
    </>
  )
}
