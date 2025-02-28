import { create } from 'zustand'

interface LayersState {
  baseLayer: string
  skinGlowLayer: string
  colorBrushLayers: Record<string, string>
  hairColorLayer: string
  eyeContactsLayer: string
  eyeContactsData: string
  resetStatus: number
}

interface LayersStore extends LayersState {
  setBaseLayer: (layer: string) => void
  setSkinGlowLayer: (layer: string) => void
  setColorBrushLayers: (brushId: string, layer: string) => void
  setHairColorLayer: (layer: string) => void
  setEyeContactsLayer: (layer: string) => void
  setEyeContactsData: (data: string) => void
  resetLayers: () => void
}

export const useLayersStore = create<LayersStore>((set) => ({
  baseLayer: '',
  skinGlowLayer: '',
  colorBrushLayers: {},
  hairColorLayer: '',
  eyeContactsLayer: '',
  eyeContactsData: '',
  resetStatus: 0,
  setBaseLayer: (layer) => set({ baseLayer: layer }),
  setSkinGlowLayer: (layer) => set({ skinGlowLayer: layer }),
  setColorBrushLayers: (brushId, layer) =>
    set((state) => ({
      colorBrushLayers: {
        ...state.colorBrushLayers,
        [brushId]: layer
      }
    })),
  setHairColorLayer: (layer) => set({ hairColorLayer: layer }),
  setEyeContactsLayer: (layer) => set({ eyeContactsLayer: layer }),
  setEyeContactsData: (data) => set({ eyeContactsData: data }),
  resetLayers: () =>
    set((state) => ({
      skinGlowLayer: '',
      colorBrushLayers: {},
      hairColorLayer: '',
      resetStatus: state.resetStatus + 1
    }))
}))
