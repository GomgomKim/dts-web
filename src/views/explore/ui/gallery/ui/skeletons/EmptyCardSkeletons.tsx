import { CardSkeleton } from '@/shared/ui'

interface EmptyCardSkeletonsProps {
  isShow: boolean
  count: number
}

export const EmptyCardSkeletons = (props: EmptyCardSkeletonsProps) => {
  if (!props.isShow) return null

  return (
    <>
      {Array.from({ length: props.count }).map((_value, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  )
}
