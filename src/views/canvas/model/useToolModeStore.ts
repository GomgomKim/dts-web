import { create } from 'zustand'

import { TOOL_IDS, TOOL_MODE } from '../ui/brush-erase-toggle/model'

const DEFAULT_TOOL_SIZE = 50

interface ToolModeState {
  selectedTool: TOOL_MODE | null
  toolSize: number
  setSelectedTool: (tool: TOOL_MODE) => void
  setToolSize: (value: number) => void
}

export const useToolModeStore = create<ToolModeState>((set) => ({
  selectedTool: TOOL_IDS.BRUSH,
  toolSize: DEFAULT_TOOL_SIZE,
  setSelectedTool: (tool) =>
    set((state) => ({
      selectedTool: state.selectedTool === tool ? null : tool
    })),
  setToolSize: (value) =>
    set(() => ({
      toolSize: value
    }))
}))
