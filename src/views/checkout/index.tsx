'use client'

import { UI_TEXT } from './model/constants'
import { OrderSummary } from './ui'

export default function Checkout() {
  return (
    <div className="w-full">
      <h1 className="mb-5 text-[2rem] font-semibold">{UI_TEXT.CHECKOUT}</h1>
      <OrderSummary />
    </div>
  )
}
