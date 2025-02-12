'use client'

import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/ui'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'

import { UI_TEXT } from './model/constants'

export default function Checkout() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('planId')
  console.log(planId)

  return (
    <div className="w-full">
      <h1 className="mb-5 text-[2rem] font-semibold">{UI_TEXT.CHECKOUT}</h1>
      <div className="m-auto w-[560px] divide-y rounded-[0.5rem] border border-neutral-2 p-10">
        <h2 className="mb-8 text-[1.5rem] font-semibold">
          {UI_TEXT.ORDER_SUMMARY}
        </h2>
        <div className="space-y-3 py-6">
          <OrderLabeledDetail
            label={UI_TEXT.PLAN}
            detail="1 model plan (includes 20 credits)"
          />
          <OrderLabeledDetail
            label={UI_TEXT.BILLING_CYCLE}
            detail={
              <>
                <div className="mb-1 text-right text-[1.125rem] font-normal text-white">
                  {UI_TEXT.MONTHLY}
                </div>
                <div className="text-right text-[1rem] text-neutral-5">
                  2025. 02. 01 - 2025. 03. 01
                </div>
              </>
            }
          />
        </div>
        <div className="py-8">
          <OrderLabeledDetail label={UI_TEXT.PRICE} detail={<>$100</>} />
        </div>
        <div className="divide-y pb-6 pt-8">
          <div className="space-y-3 pb-6">
            <OrderLabeledDetail label={UI_TEXT.DISCOUNT} detail={<>-</>} />
            <OrderLabeledDetail label={UI_TEXT.SUBTOTAL} detail={<>$100</>} />
          </div>
          <div className="pt-6">
            <OrderLabeledDetail
              label={
                <>
                  <span className="text-[1.125rem] font-bold">
                    {UI_TEXT.AMOUNT_PAID}
                  </span>{' '}
                  <span className="text-[1.125rem] text-neutral-5">
                    ({UI_TEXT.TAXES_INCLUDED})
                  </span>
                </>
              }
              detail={<span className="text-[1.125rem] font-bold">$100</span>}
            />
          </div>
        </div>
        <div className="border-none">
          {/* usd이면 페이팔 버튼 렌더링 */}
          <Button stretch type="button" className="bg-white hover:bg-white">
            {UI_TEXT.PAY_NOW}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface OrderLabeledDetailProps {
  label: React.ReactNode
  detail: React.ReactNode
}

const OrderLabeledDetail = (props: OrderLabeledDetailProps) => {
  return (
    <LabeledDetail>
      <LabeledDetailLabel className="text-[1.125rem] font-normal text-white">
        {props.label}
      </LabeledDetailLabel>
      <LabeledDetailDetail className="text-[1.125rem] font-normal text-white">
        {props.detail}
      </LabeledDetailDetail>
    </LabeledDetail>
  )
}
