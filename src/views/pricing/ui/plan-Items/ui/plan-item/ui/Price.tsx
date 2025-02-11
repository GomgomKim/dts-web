'use client'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

export const Price = ({ price }: { price: number }) => {
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())
  return (
    <>
      {/* TODO: won 포맷팅 */}
      <span className="text-[2rem] font-medium">
        {currencySign}
        {price}
      </span>
      <span className="ml-2 text-[0.875rem] font-medium text-neutral-7">
        / month
      </span>
    </>
  )
}
