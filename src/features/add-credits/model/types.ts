export type CreditNum = '10' | '30' | '50' | '100' | '200'
export type CreditName =
  | 'CREDIT_1'
  | 'CREDIT_2'
  | 'CREDIT_3'
  | 'CREDIT_4'
  | 'CREDIT_5'

export interface Credit {
  id: number // 2 ~ 6
  name: CreditName
  price: number // dollar, won
}

// TODO: 인터페이스 나오면 model/api로 옮기기
export interface PostPurchaseCreditRequest {
  credit: Credit['id']
}
