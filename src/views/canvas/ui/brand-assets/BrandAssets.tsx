'use client'

import { Suspense } from 'react'

import { ImageInputBox } from '@/features/upload-asset'

import { RecentItems, RecentItemsSkeleton } from '@/entities/recent-items'

import { Asset } from '@/shared/api/types'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'

import { UI_TEXT } from './model/constants'
import { useBrandAssetsStore } from './model/useBrandAssetsStore'

export const BrandAssets = () => {
  const isRecentItemsShow = useBrandAssetsStore(
    (state) => state.isShowRecentItems
  )
  const setIsRecentItemsShow = useBrandAssetsStore(
    (state) => state.setIsShowRecentItems
  )

  const selectedItems = useBrandAssetsStore((state) => state.selectedItems)
  const addSelectedItem = useBrandAssetsStore((state) => state.addSelectedItem)
  const removeSelectedItem = useBrandAssetsStore(
    (state) => state.removeSelectedItem
  )

  const handleCheckbox = (selectedItem: Asset) => {
    const isSelected = selectedItems?.some(
      (item) => item.id === selectedItem.id
    )

    return isSelected
      ? removeSelectedItem(selectedItem)
      : addSelectedItem(selectedItem)
  }

  return (
    <div className="flex h-screen">
      <div className="flex w-[400px] flex-col gap-3 border-l border-neutral-2 bg-background p-6">
        {/* image upload */}
        <div className="shrink-0 basis-[160px] lg:my-1">
          <ImageInputBox
            disabled={false}
            assetType="BRAND"
            onSuccess={(item) => {
              addSelectedItem(item)
            }}
          />
        </div>

        {/* Recent */}
        <div className="flex items-center justify-between *:text-neutral-7">
          <h4 className="text-[1rem]">{UI_TEXT.RECENTS}</h4>
          <div className="flex items-center gap-2">
            <Label htmlFor="recent-show-mode" className="text-[0.875rem]">
              {isRecentItemsShow ? 'Show' : 'Hide'}
            </Label>
            <Switch
              id="recent-show-mode"
              checked={isRecentItemsShow}
              onCheckedChange={() => setIsRecentItemsShow(!isRecentItemsShow)}
            />
          </div>
        </div>
        {isRecentItemsShow ? (
          <div className="mr-[-10px] grow overflow-x-hidden overflow-y-scroll">
            <Suspense fallback={<RecentItemsSkeleton />}>
              <RecentItems<Asset>
                assetType="BRAND"
                selectedItem={selectedItems}
                onClickCheckbox={handleCheckbox}
              />
            </Suspense>
          </div>
        ) : null}
      </div>
    </div>
  )
}
