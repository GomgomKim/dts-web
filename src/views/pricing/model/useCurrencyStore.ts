import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Currency } from '../ui/plan-Items/model/types'

const PERSIST_KEY = 'dts-currency-store'

export interface CurrencyState {
  currency: Currency
}

export interface CurrencyActions {
  setCurrency: (currency: Currency) => void
  getCurrencySign: () => string
}

export const useCurrencyStore = create(
  persist<CurrencyState & CurrencyActions>(
    (set, get) => ({
      currency: 'KRW',
      setCurrency: (currency) => {
        set({ currency })
      },
      getCurrencySign: () => {
        return get().currency === 'KRW' ? '₩' : '$'
      }
    }),
    {
      name: PERSIST_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
)
