import { create } from 'zustand'

type useImagePreviewUrlStoreType = {
  imagePreviewUrls: Map<string, string>
  resetImagePreviewUrls: () => void
  addImagePreviewUrl: (id: string, blob: Blob) => void
  removeImagePreviewUrl: (id: string) => void
}
const useImagePreviewUrlStore = create<useImagePreviewUrlStoreType>((set) => ({
  imagePreviewUrls: new Map(),
  resetImagePreviewUrls: () =>
    set((state) => {
      state.imagePreviewUrls.clear()
      return { ...state }
    }),
  addImagePreviewUrl: (id, blob) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const previewImgSrc = event.target?.result as string
      set((state) => {
        return {
          ...state,
          imagePreviewUrls: state.imagePreviewUrls.set(id, previewImgSrc)
        }
      })
    }
    reader.readAsDataURL(blob)
  },
  removeImagePreviewUrl: (id: string) =>
    set((state) => {
      state.imagePreviewUrls.forEach((_, key) => {
        if (key === id) {
          state.imagePreviewUrls.delete(id)
        }
      })
      return { ...state }
    })
}))

export { useImagePreviewUrlStore }
