import { create } from 'zustand'

import { Brush } from '../ui/editor-panels/color-brush/model/DummyData'
import { DummyData } from '../ui/editor-panels/eye-contacts/model/DATA'
import { SkinGlow } from '../ui/editor-panels/skin-glow/model'

const DEFAULT_TRANSPARENCY = 50
const DEFAULT_SMOOTH_EDGES = 50
const DEFAULT_SKIN_GLOW_SIZE = 50

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

interface ColorBrushState {
  selectedColorBrushItem: Brush | null
  colorBrushSmoothEdges: number
  isAutoSelect: boolean
  setSelectedColorBrushItem: (item: Brush) => void
  setColorBrushSmoothEdges: (value: number) => void
  setIsAutoSelect: (value: boolean) => void
}

export const useColorBrushStore = create<ColorBrushState>((set) => ({
  isAutoSelect: false,
  selectedColorBrushItem: null,
  colorBrushSmoothEdges: DEFAULT_SMOOTH_EDGES,
  setIsAutoSelect: (value) =>
    set(() => ({
      isAutoSelect: value
    })),
  setSelectedColorBrushItem: (selectedColorBrushItem) =>
    set((state) => ({
      selectedColorBrushItem:
        selectedColorBrushItem.id === state.selectedColorBrushItem?.id
          ? null
          : selectedColorBrushItem
    })),
  setColorBrushSmoothEdges: (value) =>
    set(() => ({
      colorBrushSmoothEdges: value
    }))
}))

interface SkinGlowState {
  selectedSkinGlowItem: SkinGlow | null
  skinGlowSize: number
  setSelectedSkinGlowItem: (item: SkinGlow) => void
  setSkinGlowSize: (value: number) => void
}

export const useSkinGlowStore = create<SkinGlowState>((set) => ({
  selectedSkinGlowItem: null,
  skinGlowSize: DEFAULT_SKIN_GLOW_SIZE,
  setSelectedSkinGlowItem: (selectedSkinGlowItem) =>
    set((state) => ({
      selectedSkinGlowItem:
        selectedSkinGlowItem.id === state.selectedSkinGlowItem?.id
          ? null
          : selectedSkinGlowItem
    })),
  setSkinGlowSize: (value) =>
    set(() => ({
      skinGlowSize: value
    }))
}))
