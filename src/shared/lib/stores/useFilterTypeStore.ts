import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FilterTypeState {
  filterType: string
}

interface FilterTypeActions {
  setFilterType: (filterType: string) => void
}

export const useFilterTypeStore = create(
  persist<FilterTypeState & FilterTypeActions>(
    (set) => ({
      filterType: 'ALL',
      setFilterType: (filterType: string) => set({ filterType })
    }),
    {
      name: 'filter-type',
      getStorage: () => sessionStorage
    }
  )
)
