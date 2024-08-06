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
      state.imagePreviewUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl))
      return { ...state, imagePreviewUrls: new Map() }
    }),
  addImagePreviewUrl: (id, file) => {
    const previewImgSrc = URL.createObjectURL(file)
    set((state) => {
      return {
        ...state,
        imagePreviewUrls: state.imagePreviewUrls.set(id, previewImgSrc)
      }
    })
  },
  removeImagePreviewUrl: (id: string) =>
    set((state) => {
      const newImagePreviewUrls = new Map(state.imagePreviewUrls)
      newImagePreviewUrls.forEach((blobUrl, key) => {
        if (key === id) {
          URL.revokeObjectURL(blobUrl)
          newImagePreviewUrls.delete(id)
        }
      })
      return { ...state, imagePreviewUrls: newImagePreviewUrls }
    })
}))

export { useImageFileStore, useImagePreviewUrlStore }
