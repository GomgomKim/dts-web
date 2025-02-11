import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'

import { cn } from '@/shared/lib/utils'

import { PLAN_NAME_TITLE_MAP, Plan } from '../../../plan-Items/model/types'

interface ComparePlansProps {
  myPlan: Plan
  selectedPlan: Plan
}

export const ComparePlans = (props: ComparePlansProps) => {
  const underlineStyle =
    'relative pb-5 mb-5 after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-neutral-2 after:content-[""]'

  return (
    <div className="mb-3 rounded-[0.5rem] bg-neutral-1 px-5 py-8">
      {/* Current plan */}
      <div className={underlineStyle}>
        <PlanInfo
          label="From"
          planTitle={PLAN_NAME_TITLE_MAP[props.myPlan.name]}
          price={props.myPlan.price}
        />
      </div>
      {/* Selected plan */}
      <PlanInfo
        label="To"
        planTitle={PLAN_NAME_TITLE_MAP[props.selectedPlan.name]}
        price={props.selectedPlan.price}
        isPrimary
      />
    </div>
  )
}

interface PlanInfoProps {
  label: string
  planTitle: string
  price: number | string
  isPrimary?: boolean
}

const PlanInfo = ({ label, planTitle, price, isPrimary }: PlanInfoProps) => {
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  return (
    <div className="space-y-2">
      <p className="flex">
        <span className="mr-2 w-16 font-normal text-neutral-7">{label}</span>
        <span
          className={cn('font-medium', [
            isPrimary ? 'text-primary' : '',
            planTitle === 'Cancel' ? 'text-destructive' : ''
          ])}
        >
          {planTitle} Plan
        </span>
      </p>
      <p className="flex">
        <span className="mr-2 w-16 text-neutral-7">Price</span>
        {isPriceString(price) ? (
          <span className="ml-auto text-[1.125rem]">{price}</span>
        ) : (
          <>
            <span className="ml-auto text-[1.125rem]">
              {currencySign}
              {price}
            </span>
            <span className="ml-[6px] text-nowrap text-neutral-7">/ month</span>
          </>
        )}
      </p>
    </div>
  )
}

const isPriceString = (price: string | number) => {
  return typeof price === 'string'
}
