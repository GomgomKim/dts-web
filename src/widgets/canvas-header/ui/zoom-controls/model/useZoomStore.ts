import { create } from 'zustand'

interface ZoomStore {
  scale: number
  setScale: (scale: number) => void
}

export const useZoomStore = create<ZoomStore>((set) => ({
  scale: 1,
  setScale: (scale: number) => set({ scale })
}))
