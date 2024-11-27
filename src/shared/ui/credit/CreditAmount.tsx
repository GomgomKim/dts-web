import { cn } from '@/shared/lib/utils'

import CreditIcon from '/public/icons/database.svg'

interface CreditAmountProps {
  credit: number
  isOutOfCredit: boolean
}

export const CreditAmount = ({ credit, isOutOfCredit }: CreditAmountProps) => {
  return (
    <div className="flex items-center gap-2">
      <CreditIcon
        className={cn('stroke-white', {
          'stroke-[#FF8480]': isOutOfCredit
        })}
      />
      <span
        className={cn('min-w-4 text-center text-[14px]', {
          'text-[#FF8480]': isOutOfCredit
        })}
      >
        {credit}
      </span>
    </div>
  )
}
