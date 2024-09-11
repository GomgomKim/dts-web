import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// TODO: type 추가
export const useFilterTypeStore = create(
  persist(
    (set) => ({
      filterType: null,
      setFilterType: (filterType) => set({ filterType })
    }),
    {
      name: 'filter-type'
    }
  )
)
