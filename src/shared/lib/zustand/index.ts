import { enableMapSet } from 'immer'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

enableMapSet()

export const createStore = <T extends object>(
  name: string,
  initializer: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/immer', never]]
  >
) =>
  create<T, [['zustand/devtools', never], ['zustand/immer', never]]>(
    devtools(immer(initializer), {
      enabled: process.env.NODE_ENV !== 'production',
      name
    })
  )
