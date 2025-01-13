export const RecentItemsSkeleton = () => {
  return (
    <div className="relative mr-[4px] grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-[0.5rem] bg-neutral-2/50"
        />
      ))}
      <div className="absolute inset-0 bg-custom-gradient" />
    </div>
  )
}
