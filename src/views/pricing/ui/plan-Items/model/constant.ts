import { Plan } from '../ui/plan-item/type'

export const UI_TEXT = {
  POPULAR: 'Popular',
  SUBSCRIBE_NOW: 'Subscribe Now',
  ACTIVE: 'Active',
  UPGRADE_PLAN: 'Upgrade Plan',
  DOWNGRADE_PLAN: 'Downgrade Plan',
  GET_UNLIMITED_ACCESS: 'Get Unlimited Access',
  LETS_TALK: 'Let’s Talk'
} as const

export const PLAN_ITEMS: Plan[] = [
  {
    id: '1',
    title: '1 Model',
    price: 100,
    credits: 20,
    features: [
      'Up to 1 model',
      'All AI tools included',
      'Brand assets editor included',
      'Watermark-free',
      'High-resolution exports'
    ]
  },
  {
    id: '2',
    title: '2 Models',
    price: 190,
    credits: 40,
    features: ['Up to 2 models', 'Includes all features from previous plans']
  },
  {
    id: '3',
    title: '3 Models',
    price: 280,
    credits: 60,
    features: ['Up to 3 models', 'Includes all features from previous plans']
  },
  {
    id: '4',
    title: '4 Models',
    price: 370,
    credits: 80,
    features: ['Up to 4 models', 'Includes all features from previous plans']
  },
  {
    id: '5',
    title: '5 Models',
    price: 460,
    credits: 100,
    features: ['Up to 5 models', 'Includes all features from previous plans']
  },
  {
    id: '6',
    title: 'Unlimited',
    price: 1200,
    credits: 200,
    features: ['Unlimited models', 'Includes all features from previous plans']
  },
  {
    id: '7',
    title: 'Custom',
    price: 'Contact Us',
    credits: 'Scalable for organizations',
    features: [
      'Custom models designed exclusively for your brand',
      'Includes all features from previous plans'
    ]
  }
]
