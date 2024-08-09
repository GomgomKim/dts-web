import { create } from 'zustand'

type useImageFileStore = {
  imageFiles: Map<string, File>
  resetImageFiles: () => void
  addImageFile: (id: string, files: File) => void
  removeImageFile: (id: string) => void
}

const useImageFileStore = create<useImageFileStore>((set) => ({
  imageFiles: new Map<string, File>(),
  resetImageFiles: () =>
    set((state) => ({ ...state, imageFiles: new Map<string, File>() })),
  addImageFile: (id, file) =>
    set((state) => {
      return { ...state, imageFiles: state.imageFiles.set(id, file) }
    }),
  removeImageFile: (id) => {
    set((state) => {
      const newImageFiles = new Map<string, File>(state.imageFiles)
      newImageFiles.delete(id)
      return { ...state, imageFiles: newImageFiles }
    })
  }
}))

type useImagePreviewUrlStore = {
  imagePreviewUrls: Map<string, string>
  resetImagePreviewUrls: () => void
  addImagePreviewUrl: (id: string, file: File) => void
  removeImagePreviewUrl: (id: string) => void
}
const useImagePreviewUrlStore = create<useImagePreviewUrlStore>((set) => ({
  imagePreviewUrls: new Map(),
  resetImagePreviewUrls: () =>
    set((state) => {
      state.imagePreviewUrls.clear()
      return { ...state }
    }),
  addImagePreviewUrl: (id, file) => {
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
    reader.readAsDataURL(file)
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

export { useImageFileStore, useImagePreviewUrlStore }
