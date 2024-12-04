import { RecentItem } from './ui/recent-item/RecentItem'

export const RecentItems = () => {
  return (
    <div className="mr-[4px] grid grid-cols-2 gap-3">
      {Array.from({ length: 10 }, (_, i) => (
        <RecentItem key={i} />
      ))}
    </div>
  )
}
