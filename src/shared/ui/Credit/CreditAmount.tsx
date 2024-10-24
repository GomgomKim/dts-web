import { cn } from '@/shared/lib/utils'

import CreditIcon from '/public/icons/database.svg'

interface CreditAmountProps {
  credit: number
  isOutOfCredit: boolean
}

export const CreditAmount = ({ credit, isOutOfCredit }: CreditAmountProps) => {
  return (
    <div className="flex gap-2 items-center">
      <CreditIcon
        className={cn('stroke-white', {
          'stroke-[#FF8480]': isOutOfCredit
        })}
      />
      <span
        className={cn('text-[14px] w-4 text-center', {
          'text-[#FF8480]': isOutOfCredit
        })}
      >
        {credit}
      </span>
    </div>
  )
}
