import { create } from 'zustand'

interface GenerativeItemState {
  index: number
}

interface GenerativeItemActions {
  setIndex: (index: number) => void
}

export const useGenerativeItemStore = create<
  GenerativeItemState & GenerativeItemActions
>((set) => ({
  index: 0,
  setIndex: (index: number) => set({ index })
}))
