import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PathnameState {
  prevPath: string
  currentPath: string
}

interface PathnameActions {
  updateCurrentPath: (currentPath: string) => void
}

export const usePathStore = create(
  persist<PathnameState & PathnameActions>(
    (set) => ({
      prevPath: '/',
      currentPath: '/',
      updateCurrentPath: (newPath: string) =>
        set((state) => {
          return {
            ...state,
            prevPath: state.currentPath,
            currentPath: newPath
          }
        })
    }),
    {
      name: 'pathname',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
