import { Currency } from '@/views/pricing/ui/plan-Items/model/types'

import { Credit, CreditName, CreditNum } from './types'

export const UI_TEXT = {
  CREDITS: 'Credits'
}

export const CREDIT_NAME_TITLE_MAP: Record<string, CreditNum> = {
  CREDIT_1: '10',
  CREDIT_2: '30',
  CREDIT_3: '50',
  CREDIT_4: '100',
  CREDIT_5: '200'
}

export const CREDIT_TITLE_NAME_MAP: Record<CreditNum, CreditName> = {
  10: 'CREDIT_1',
  30: 'CREDIT_2',
  50: 'CREDIT_3',
  100: 'CREDIT_4',
  200: 'CREDIT_5'
}

export const CREDIT_ITEMS: { [key in Currency]: Credit[] } = {
  KRW: [
    {
      id: 2,
      name: 'CREDIT_1',
      price: 14000
    },
    {
      id: 3,
      name: 'CREDIT_2',
      price: 42000
    },
    {
      id: 4,
      name: 'CREDIT_3',
      price: 70000
    },
    {
      id: 5,
      name: 'CREDIT_4',
      price: 140000
    },
    {
      id: 6,
      name: 'CREDIT_5',
      price: 280000
    }
  ],
  USD: [
    {
      id: 2,
      name: 'CREDIT_1',
      price: 10
    },
    {
      id: 3,
      name: 'CREDIT_2',
      price: 30
    },
    {
      id: 4,
      name: 'CREDIT_3',
      price: 50
    },
    {
      id: 5,
      name: 'CREDIT_4',
      price: 100
    },
    {
      id: 6,
      name: 'CREDIT_5',
      price: 200
    }
  ]
}
