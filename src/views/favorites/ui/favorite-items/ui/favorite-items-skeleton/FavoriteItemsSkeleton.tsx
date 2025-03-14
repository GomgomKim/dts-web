import { CardSkeleton } from '@/shared/ui/card'

export const FavoriteItemsSkeleton = () => {
  return (
    <div className="grid-cols-auto-fill-small md:grid-cols-auto-fill-medium grid gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <CardSkeleton key={i} isLoading />
      ))}
    </div>
  )
}
