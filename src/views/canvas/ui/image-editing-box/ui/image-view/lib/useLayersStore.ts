import { create } from 'zustand'

interface LayersState {
  baseLayer: string
  skinGlowLayer: string
  colorBrushLayers: Record<string, string>
  hairColorLayer: string
  eyeContactsLayer: string
}

interface LayersStore extends LayersState {
  setBaseLayer: (layer: string) => void
  setSkinGlowLayer: (layer: string) => void
  setColorBrushLayers: (brushId: string, layer: string) => void
  setHairColorLayer: (layer: string) => void
  setEyeContactsLayer: (layer: string) => void
  resetLayers: () => void
}

export const useLayersStore = create<LayersStore>((set) => ({
  baseLayer: '',
  skinGlowLayer: '',
  colorBrushLayers: {},
  hairColorLayer: '',
  eyeContactsLayer: '',
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
  resetLayers: () =>
    set({
      skinGlowLayer: '',
      colorBrushLayers: {},
      hairColorLayer: '',
      eyeContactsLayer: ''
    })
}))
