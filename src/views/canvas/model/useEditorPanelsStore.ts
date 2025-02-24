import { DummyData } from '@/entities/recent-items/model/types'

import { Asset } from '@/shared/api/types'

import { create } from 'zustand'

import { TOOL_MODE } from '../ui/add-remove-toggle/model'
import {
  BASIC_BRUSHES,
  Brush,
  MAX_CUSTOM_BRUSHES
} from '../ui/editor-panels/color-brush/model/DummyData'
import { SkinGlow } from '../ui/editor-panels/skin-glow/model'

const DEFAULT_TRANSPARENCY = 50
const DEFAULT_SMOOTH_EDGES = 50
const DEFAULT_SKIN_GLOW_SIZE = 50
const DEFAULT_SKIN_GLOW_POWER = 50
interface UploadPanelState<T> {
  selectedItem: T | null
  transparency: number
  isShowRecentItems: boolean
  setSelectedItem: (item: T | null) => void
  setTransparency: (value: number) => void
  setIsShowRecentItems: (value: boolean) => void
  resetSelectedItem: () => void
}

const createUploadPanelStore = <T extends { id: string | number }>() =>
  create<UploadPanelState<T>>((set) => ({
    selectedItem: null,
    transparency: DEFAULT_TRANSPARENCY,
    isShowRecentItems: true,
    setSelectedItem: (selectedItem) =>
      set((state) => {
        if (!selectedItem) {
          return {
            ...state,
            selectedItem: null
          }
        }
        return {
          ...state,
          selectedItem:
            selectedItem.id === state.selectedItem?.id ? null : selectedItem
        }
      }),
    setTransparency: (value) =>
      set(() => ({
        transparency: value
      })),
    setIsShowRecentItems: (value) =>
      set(() => ({
        isShowRecentItems: value
      })),
    resetSelectedItem: () => set({ selectedItem: null })
  }))

type EyeContactsType = DummyData | Asset
export const useEyeContactsStore = createUploadPanelStore<EyeContactsType>()

type CreamTextureType = DummyData | Asset
export const useCreamTextureStore = createUploadPanelStore<CreamTextureType>()

interface ColorBrushState {
  selectedColorBrushItem: Brush | null
  colorBrushSmoothEdges: number
  isAutoSelect: boolean
  colorBrushColor: [number, number, number]
  colorBrushOpacity: number
  customBrushes: Brush[]
  setSelectedColorBrushItem: (item: Brush | null) => void
  setColorBrushSmoothEdges: (value: number) => void
  setIsAutoSelect: (value: boolean) => void
  setColorBrushColor: (value: [number, number, number]) => void
  setColorBrushOpacity: (value: number) => void
  addCustomBrush: (brush: Brush) => void
  updateBrushColor: (brushId: string, color: [number, number, number]) => void
  updateBrushOpacity: (brushId: string, opacity: number) => void
}

export const useColorBrushStore = create<ColorBrushState>((set) => ({
  isAutoSelect: false,
  selectedColorBrushItem: null,
  colorBrushSmoothEdges: DEFAULT_SMOOTH_EDGES,
  colorBrushColor: [255, 255, 255],
  colorBrushOpacity: 0.3,
  customBrushes: [...BASIC_BRUSHES],
  setIsAutoSelect: (value) =>
    set(() => ({
      isAutoSelect: value
    })),
  setSelectedColorBrushItem: (item) => set({ selectedColorBrushItem: item }),
  setColorBrushSmoothEdges: (value) =>
    set(() => ({
      colorBrushSmoothEdges: value
    })),
  setColorBrushColor: (value) => set(() => ({ colorBrushColor: value })),
  setColorBrushOpacity: (value) => set(() => ({ colorBrushOpacity: value })),
  addCustomBrush: (brush) =>
    set((state) => {
      if (state.customBrushes.length >= MAX_CUSTOM_BRUSHES) return state
      return { customBrushes: [...state.customBrushes, brush] }
    }),
  updateBrushColor: (brushId, color) =>
    set((state) => ({
      customBrushes: state.customBrushes.map((brush) =>
        brush.id === brushId ? { ...brush, color } : brush
      )
    })),
  updateBrushOpacity: (brushId, opacity) =>
    set((state) => ({
      customBrushes: state.customBrushes.map((brush) =>
        brush.id === brushId ? { ...brush, opacity } : brush
      )
    }))
}))

interface SkinGlowState {
  selectedSkinGlowItem: SkinGlow | null
  skinGlowSize: number
  skinGlowPower: number
  setSelectedSkinGlowItem: (item: SkinGlow) => void
  setSkinGlowSize: (value: number) => void
  setSkinGlowPower: (value: number) => void
}

export const useSkinGlowStore = create<SkinGlowState>((set) => ({
  selectedSkinGlowItem: null,
  skinGlowSize: DEFAULT_SKIN_GLOW_SIZE,
  skinGlowPower: DEFAULT_SKIN_GLOW_POWER,
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
    })),
  setSkinGlowPower: (value) =>
    set(() => ({
      skinGlowPower: value
    }))
}))

interface HairColorState {
  hairColor: [number, number, number] | null
  hairColorOpacity: number
  hairColorLevel: number
  selectedToolId: TOOL_MODE | null
  isEditing: boolean
  setHairColor: (color: [number, number, number]) => void
  setHairColorOpacity: (opacity: number) => void
  setHairColorLevel: (value: number) => void
  setSelectedToolId: (toolId: TOOL_MODE | null) => void
  setIsEditing: (value: boolean) => void
}

export const useHairColorStore = create<HairColorState>((set) => ({
  hairColor: null,
  hairColorOpacity: 1.0,
  hairColorLevel: 50,
  selectedToolId: null,
  isEditing: false,
  setHairColor: (color) => set({ hairColor: color }),
  setHairColorOpacity: (opacity) => set({ hairColorOpacity: opacity }),
  setHairColorLevel: (value) => set({ hairColorLevel: value }),
  setSelectedToolId: (toolId) => set({ selectedToolId: toolId }),
  setIsEditing: (value) => set({ isEditing: value })
}))

interface GlowState {
  isGlowVisible: boolean
  setIsGlowVisible: (value: boolean) => void
}

export const useGlowStore = create<GlowState>((set) => ({
  isGlowVisible: true,
  setIsGlowVisible: (value) => set({ isGlowVisible: value })
}))
