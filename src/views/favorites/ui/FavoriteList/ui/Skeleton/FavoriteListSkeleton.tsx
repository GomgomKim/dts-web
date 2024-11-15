import { CardSkeleton } from '@/shared/ui/Card/CardSkeleton'

export const FavoriteListSkeleton = () => {
  return (
    <div className="grid grid-cols-auto-fill-small gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <CardSkeleton key={i} isLoading />
      ))}
    </div>
  )
}
