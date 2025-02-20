import { useSearchParams } from 'next/navigation'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import {
  CREDIT_ITEMS,
  CREDIT_NAME_TITLE_MAP
} from '@/features/add-credits/model/constants'

import { OrderLabeledDetail } from '../OrderLabeledDetail'
import { OrderSummaryContainer } from '../order-summary-container'
import { UI_TEXT } from './model/constants'

export const CreditOrderSummary = () => {
  const searchParams = useSearchParams()
  const currency = useCurrencyStore((state) => state.currency)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const creditId = searchParams.get('creditId')

  if (!creditId) {
    console.log('creditId is not found')
    return null
  }
  const selectedCredit = CREDIT_ITEMS[currency].find(
    (item) => item.id === parseInt(creditId)
  )

  if (!selectedCredit) return null

  const discount = 0
  const subtotal = selectedCredit?.price - discount

  return (
    <OrderSummaryContainer subtotal={subtotal} discount={discount}>
      <div className="space-y-3 py-6">
        <OrderLabeledDetail
          label={UI_TEXT.CREDITS}
          detail={`${CREDIT_NAME_TITLE_MAP[selectedCredit.name]} ${UI_TEXT.CREDITS}`}
        />
      </div>
      <div className="py-8">
        <OrderLabeledDetail
          label={UI_TEXT.PRICE}
          detail={`${currencySign}${selectedCredit?.price}`}
        />
      </div>
    </OrderSummaryContainer>
  )
}
