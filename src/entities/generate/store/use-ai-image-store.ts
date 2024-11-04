import { Variation } from '@/shared/api/types'

import { create } from 'zustand'

type AiImageState = {
  // isAiImageFailed: boolean | null
  isAiImageGenerating: boolean | null
  aiImageGeneratingList: Variation[]
  aiImageList: Variation[]
}

type AiImageAction = {
  // setIsAiImageFailed: (isAiImageFailed: boolean) => void
  setIsAiImageGenerating: (isAiImageGenerating: boolean) => void
  addAiImageGeneratingList: (items: Variation[]) => void
  removeAiImageGeneratingList: (variationId: number) => void
  setAiImageList: (items: Variation[]) => void
  addAiImageItem: (items: Variation[]) => void
  updateAiImageItem: (updatedItem: Variation) => void
  resetAiImageGeneratingList: () => void
}

export const useAiImageGeneratingStore = create<AiImageState & AiImageAction>(
  (set) => ({
    // isAiImageFailed: null,
    isAiImageGenerating: null,
    aiImageGeneratingList: [],
    aiImageList: [],
    // setIsAiImageFailed: (isAiImageFailed: boolean) => set({ isAiImageFailed }),
    setIsAiImageGenerating: (isAiImageGenerating: boolean) =>
      set({ isAiImageGenerating }),
    addAiImageGeneratingList: (newItems: Variation[]) =>
      set((state) => {
        const mergedList = state.aiImageGeneratingList.concat(newItems)
        return { ...state, aiImageGeneratingList: mergedList }
      }),
    removeAiImageGeneratingList: (variationId: number) =>
      set((state) => {
        const newList = state.aiImageGeneratingList.filter(
          (item) => item.variationId !== variationId
        )

        return { ...state, aiImageGeneratingList: newList }
      }),
    setAiImageList: (items: Variation[]) =>
      set((state) => {
        return { ...state, aiImageList: items }
      }),
    addAiImageItem: (items: Variation[]) =>
      set((state) => {
        const mergedList = state.aiImageList.concat(items)
        return { ...state, aiImageList: mergedList }
      }),
    updateAiImageItem: (updatedItem: Variation) =>
      set((state) => {
        const newList = state.aiImageList.map((item) => {
          return item.variationId === updatedItem.variationId
            ? updatedItem
            : item
        })

        return { ...state, aiImageList: newList }
      }),
    resetAiImageGeneratingList: () =>
      set((state) => {
        return { ...state, aiImageGeneratingList: [], aiImageList: [] }
      })
  })
)
