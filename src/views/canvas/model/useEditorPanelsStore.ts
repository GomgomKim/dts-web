import { create } from 'zustand'

import { DummyData } from '../ui/editor-panels/eye-contacts/model/DATA'

const DEFAULT_TRANSPARENCY = 50

interface UploadPanelState<T> {
  selectedItem: T | null
  transparency: number
  isShowRecentItems: boolean
  setSelectedItem: (item: T) => void
  setTransparency: (value: number) => void
  setIsShowRecentItems: (value: boolean) => void
}

const createUploadPanelStore = <T extends { id: string }>() =>
  create<UploadPanelState<T>>((set) => ({
    selectedItem: null,
    transparency: DEFAULT_TRANSPARENCY,
    isShowRecentItems: true,
    setSelectedItem: (selectedItem) =>
      set((state) => ({
        selectedItem:
          selectedItem.id === state.selectedItem?.id ? null : selectedItem
      })),
    setTransparency: (value) =>
      set(() => ({
        transparency: value
      })),
    setIsShowRecentItems: (value) =>
      set(() => ({
        isShowRecentItems: value
      }))
  }))

type EyeContactsType = DummyData
export const useEyeContactsStore = createUploadPanelStore<EyeContactsType>()

type CreamTextureType = DummyData
export const useCreamTextureStore = createUploadPanelStore<CreamTextureType>()
