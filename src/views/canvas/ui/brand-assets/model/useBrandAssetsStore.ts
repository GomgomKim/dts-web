import { Asset } from '@/shared/api/types'

import { create } from 'zustand'

interface BrandAssetsState {
  selectedItems: Asset[]
  isShowRecentItems: boolean
  addSelectedItem: (selectedItem: Asset) => void
  removeSelectedItem: (selectedItem: Asset) => void
  setIsShowRecentItems: (value: boolean) => void
}

export const useBrandAssetsStore = create<BrandAssetsState>((set) => ({
  selectedItems: [],
  isShowRecentItems: true,
  addSelectedItem: (selectedItem) =>
    set((state) => ({
      ...state,
      selectedItems: [...state.selectedItems, selectedItem]
    })),
  removeSelectedItem: (selectedItem) =>
    set((state) => ({
      ...state,
      selectedItems: state.selectedItems?.filter(
        (item) => item.id !== selectedItem.id
      )
    })),
  setIsShowRecentItems: (value) =>
    set(() => ({
      isShowRecentItems: value
    }))
}))
