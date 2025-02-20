export type Currency = 'USD' | 'KRW'
type CreditNum = 1 | 20 | 40 | 60 | 80 | 100 | 200
type ModelNum = 1 | 2 | 3 | 4 | 5 | -1
export type PlanName =
  | 'FREE'
  | 'MODEL_1'
  | 'MODEL_2'
  | 'MODEL_3'
  | 'MODEL_4'
  | 'MODEL_5'
  | 'UNLIMITED'
  | 'CUSTOM'
type PlanTitle =
  | '1 Model'
  | '2 Models'
  | '3 Models'
  | '4 Models'
  | '5 Models'
  | 'Unlimited'
  | 'Custom'

export interface Plan {
  id: number
  name: PlanName
  price: number
  modelNum: ModelNum
  creditNum: CreditNum
}

export type OtherPlan = Pick<Plan, 'id'> & {
  name: string // custom
  price: string
  creditNum: string
}

export const PLAN_NAME_TITLE_MAP: Record<string, PlanTitle | string> = {
  FREE: 'Free',
  MODEL_1: '1 Model',
  MODEL_2: '2 Models',
  MODEL_3: '3 Models',
  MODEL_4: '4 Models',
  MODEL_5: '5 Models',
  UNLIMITED: 'Unlimited',
  CUSTOM: 'Custom'
}

export const PLAN_TITLE_NAME_MAP: Record<PlanTitle, PlanName | string> = {
  '1 Model': 'MODEL_1',
  '2 Models': 'MODEL_2',
  '3 Models': 'MODEL_3',
  '4 Models': 'MODEL_4',
  '5 Models': 'MODEL_5',
  Unlimited: 'UNLIMITED',
  Custom: 'CUSTOM'
}
