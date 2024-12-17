import { StaticImageData } from 'next/image'

import { RecentItem } from './ui/recent-item/RecentItem'

interface RecentItemsProps<T> {
  data: T[]
  selectedItem: T | null
  onClickCheckbox: (item: T) => void
}

export const RecentItems = <
  T extends {
    id: string
    name: string
    src: string | StaticImageData
  }
>(
  props: RecentItemsProps<T>
) => {
  return (
    <div className="mr-[4px] grid grid-cols-2 gap-3">
      {props.data.map((item) => (
        <RecentItem
          key={item.id}
          item={item}
          onClick={() => props.onClickCheckbox(item)}
          isSelected={item.id === props.selectedItem?.id}
        />
      ))}
    </div>
  )
}
