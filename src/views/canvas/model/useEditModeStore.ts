import { create } from 'zustand'

const DEFAULT_TOOL_SIZE = 50

interface EditModeState {
  toolSize: number
  setToolSize: (value: number) => void
}

export const useEditModeStore = create<EditModeState>((set) => ({
  toolSize: DEFAULT_TOOL_SIZE,
  setToolSize: (value) =>
    set(() => ({
      toolSize: value
    }))
}))
