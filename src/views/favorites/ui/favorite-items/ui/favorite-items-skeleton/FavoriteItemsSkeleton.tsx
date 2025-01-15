import { GalleryItemSkeleton } from '@/entities/gallery-item'

export const FavoriteItemsSkeleton = () => {
  return (
    <div className="grid-cols-auto-fill-small md:grid-cols-auto-fill-medium grid gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <GalleryItemSkeleton key={i} isLoading />
      ))}
    </div>
  )
}
