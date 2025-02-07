// TODO:
export type Credit = '10' | '20' | '30' | '50' | '100'

export interface CreditOption {
  id: Credit
  label: string
  value: number
}

// TODO: 인터페이스 나오면 model/api로 옮기기
export interface PostPurchaseCreditRequest {
  credit: Credit
  isAgreeToPricingPolicy: boolean
}
