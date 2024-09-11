import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FilterTypeState {
  filterType: string | null
}

interface FilterTypeActions {
  setFilterType: (filterType: string) => void
}

// TODO: type 추가
export const useFilterTypeStore = create(
  persist<FilterTypeState & FilterTypeActions>(
    (set) => ({
      filterType: null,
      setFilterType: (filterType: string) => set({ filterType })
    }),
    {
      name: 'filter-type'
    }
  )
)
