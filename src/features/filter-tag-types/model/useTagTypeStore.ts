import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TagTypeState {
  tagType: string
}

interface TagTypeActions {
  setTagType: (tagType: string) => void
}

export const useTagTypeStore = create(
  persist<TagTypeState & TagTypeActions>(
    (set) => ({
      tagType: 'ALL',
      setTagType: (tagType: string) => set({ tagType })
    }),
    {
      name: 'tag-type',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
