import { create } from 'zustand'

type useImagePreviewUrlStoreType = {
  imagePreviewUrls: Map<string, string>
  resetImagePreviewUrls: () => void
  addImagePreviewUrl: (id: string, previewImgSrc: string) => void
  removeImagePreviewUrl: (id: string) => void
}

export const useImagePreviewUrlStore = create<useImagePreviewUrlStoreType>(
  (set) => ({
    imagePreviewUrls: new Map(),
    resetImagePreviewUrls: () =>
      set((state) => {
        state.imagePreviewUrls.clear()
        return { ...state }
      }),
    addImagePreviewUrl: (id, previewImgSrc) =>
      set((state) => {
        return {
          ...state,
          imagePreviewUrls: state.imagePreviewUrls.set(id, previewImgSrc)
        }
      }),
    removeImagePreviewUrl: (id: string) =>
      set((state) => {
        state.imagePreviewUrls.forEach((_, key) => {
          if (key === id) {
            state.imagePreviewUrls.delete(id)
          }
        })
        return { ...state }
      })
  })
)
