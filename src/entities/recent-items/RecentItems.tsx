'use client'

import { Asset, AssetType } from '@/shared/api/types'

import { useGetAssetItems } from './model/adapter'
import { DummyData } from './model/types'
import { RecentItem } from './ui/recent-item/RecentItem'

interface RecentItemsProps<T> {
  data?: T[]
  assetType: AssetType
  selectedItem: T | T[] | null
  onClickCheckbox: (item: T) => void
}

export const RecentItems = <T extends DummyData | Asset>(
  props: RecentItemsProps<T>
) => {
  const { data } = useGetAssetItems(props.assetType)

  const items = [...(props.data || []), ...(data || [])] as T[]

  return (
    <div className="mr-[4px] grid grid-cols-2 gap-3">
      {items?.map((item) => {
        const isSelected = Array.isArray(props.selectedItem)
          ? props.selectedItem.some(
              (selectedItem) => selectedItem.id === item.id
            )
          : item.id === (props.selectedItem as T)?.id

        return (
          <RecentItem
            key={item.id}
            item={item}
            onClickCheckbox={() => props.onClickCheckbox(item)}
            isSelected={isSelected}
            className={props.assetType === 'BRAND' ? 'bg-neutral-1/50' : ''}
          />
        )
      })}
    </div>
  )
}
