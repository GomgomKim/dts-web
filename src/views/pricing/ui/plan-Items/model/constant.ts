import { Currency, OtherPlan, Plan, PlanName } from './types'

export const UI_TEXT = {
  POPULAR: 'Popular',
  SUBSCRIBE_NOW: 'Subscribe Now',
  CURRENT_PLAN: 'Current Plan',
  UPGRADE_PLAN: 'Upgrade Plan',
  DOWNGRADE_PLAN: 'Downgrade Plan',
  GET_UNLIMITED_ACCESS: 'Get Unlimited Access',
  LETS_TALK: 'Let’s Talk'
} as const

export const PLAN_FEATURES: Record<Exclude<PlanName, 'FREE'>, string[]> = {
  MODEL_1: [
    'Up to 1 model',
    'All AI tools included',
    'Brand assets editor included',
    'Watermark-free',
    'High-resolution exports'
  ],
  MODEL_2: ['Up to 2 models', 'Includes all features from previous plans'],
  MODEL_3: ['Up to 3 models', 'Includes all features from previous plans'],
  MODEL_4: ['Up to 4 models', 'Includes all features from previous plans'],
  MODEL_5: ['Up to 5 models', 'Includes all features from previous plans'],
  UNLIMITED: ['Unlimited models', 'Includes all features from previous plans'],
  CUSTOM: [
    'Custom models designed exclusively for your brand',
    'Includes all features from previous plans'
  ]
}

export const PLAN_ITEMS: { [key in Currency]: Plan[] } = {
  KRW: [
    {
      id: 2,
      name: 'MODEL_1',
      price: 140000,
      modelNum: 1,
      creditNum: 20
    },
    {
      id: 3,
      name: 'MODEL_2',
      price: 260000,
      modelNum: 2,
      creditNum: 40
    },
    {
      id: 4,
      name: 'MODEL_3',
      price: 390000,
      modelNum: 3,
      creditNum: 60
    },
    {
      id: 5,
      name: 'MODEL_4',
      price: 510000,
      modelNum: 4,
      creditNum: 80
    },
    {
      id: 6,
      name: 'MODEL_5',
      price: 640000,
      modelNum: 5,
      creditNum: 100
    },
    {
      id: 7,
      name: 'UNLIMITED',
      price: 1680000,
      modelNum: -1,
      creditNum: 200
    }
  ],
  USD: [
    {
      id: 8,
      name: 'MODEL_1',
      price: 100,
      modelNum: 1,
      creditNum: 20
    },
    {
      id: 9,
      name: 'MODEL_2',
      price: 190,
      modelNum: 2,
      creditNum: 40
    },
    {
      id: 10,
      name: 'MODEL_3',
      price: 280,
      modelNum: 3,
      creditNum: 60
    },
    {
      id: 11,
      name: 'MODEL_4',
      price: 370,
      modelNum: 4,
      creditNum: 80
    },
    {
      id: 12,
      name: 'MODEL_5',
      price: 460,
      modelNum: 5,
      creditNum: 100
    },
    {
      id: 13,
      name: 'UNLIMITED',
      price: 1200,
      modelNum: -1,
      creditNum: 200
    }
  ]
}

export const PLAN_CUSTOM: OtherPlan = {
  id: 14,
  name: 'CUSTOM',
  price: 'Contact us',
  creditNum: 'Scalable for organizations'
}

export const PLAN_CANCEL: OtherPlan = {
  id: 15,
  name: 'Cancel',
  price: 'No active subscription',
  creditNum: ''
}

export const PLAN_FREE: Plan = {
  id: 1,
  name: 'FREE',
  price: 0,
  modelNum: 1,
  creditNum: 1
}
