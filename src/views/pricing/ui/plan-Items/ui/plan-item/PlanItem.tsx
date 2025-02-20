import { cn } from '@/shared/lib/utils'

import CheckIcon from '/public/icons/check.svg'

import { OtherPlan, PLAN_NAME_TITLE_MAP, Plan } from '../../model/types'
import { Price } from './ui/Price'

interface PlanItemProps {
  item: Plan | OtherPlan
  features: string[]
  badge?: React.ReactNode
  slot: React.ReactNode
}

export const PlanItem = (props: PlanItemProps) => {
  const { name, price, creditNum } = props.item

  return (
    <div className="size-full rounded-[0.5rem] bg-neutral-1">
      {/* plan price */}
      <div
        className={cn(
          'relative p-5',
          "after:absolute after:bottom-0 after:left-0 after:block after:w-full after:border-b after:border-neutral-3 after:content-['']"
        )}
      >
        <header className="mb-10">
          <span className="text-[1.125rem] font-normal">
            {PLAN_NAME_TITLE_MAP[name]}
          </span>
          {props.badge ? <span className="ml-1">{props.badge}</span> : null}
        </header>
        <div className="mb-5">
          <p className="mb-2 *:text-nowrap">{displayPrice(price)}</p>
          <p className="text-nowrap pb-[5px] text-neutral-7">
            {displayCredits(creditNum)}
          </p>
        </div>
        <div className="h-[50px]">{props.slot}</div>
      </div>
      {/* plan features  */}
      <div className="space-y-5 p-5 pb-10 pl-4">
        {props.features.map((feature) => (
          <PlanItemFeature key={feature}>{feature}</PlanItemFeature>
        ))}
      </div>
    </div>
  )
}

const displayPrice = (price: number | string) => {
  if (typeof price === 'string')
    return <span className="text-[2rem] font-medium">{price}</span>

  return <Price price={price} />
}

const displayCredits = (credits: number | string) => {
  if (typeof credits === 'string') return credits
  return `${credits} Credits per month`
}

const PlanItemFeature = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="flex">
      <CheckIcon
        width={20}
        height={20}
        stroke="#01A86F"
        className="inline-block shrink-0"
      />
      <span className="ml-2 text-neutral-7">{children}</span>
    </p>
  )
}
