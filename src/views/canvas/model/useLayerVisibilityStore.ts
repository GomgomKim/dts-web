import { AiToolId } from '@/widgets/canvas-sidebar/model/types'

import { create } from 'zustand'

interface LayerVisibilityState {
  activeTool: AiToolId | null
  activeToolVisibility: boolean
  globalVisibility: boolean
  resetStatus: boolean
  setActiveTool: (value: string) => void
  setActiveToolVisibility: (value: boolean) => void
  setGlobalVisibility: (value: boolean) => void
  setResetStatus: (value: boolean) => void
}

export const useLayerVisibilityStore = create<LayerVisibilityState>((set) => ({
  activeTool: null,
  activeToolVisibility: true,
  globalVisibility: true,
  resetStatus: false,
  setActiveTool: (value) =>
    set({ activeTool: value, activeToolVisibility: true }),
  setActiveToolVisibility: (value) => set({ activeToolVisibility: value }),
  setGlobalVisibility: (value) => set({ globalVisibility: value }),
  setResetStatus: (value) => set({ resetStatus: value })
}))
