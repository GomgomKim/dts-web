import { revertMap } from '@/shared/lib/utils/revertMap'

import { OrderType, OrderTypeLabel, OrderTypeValue } from '../../types'

export const ORDER_OPTIONS: {
  label: OrderTypeLabel
  value: OrderTypeValue
}[] = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' }
]

export const ORDER_TYPES_MAP: Record<OrderTypeValue, OrderType> = {
  newest: 'NEWEST',
  oldest: 'OLDEST'
}

export const ORDER_TYPES_REVERT_MAP = revertMap(ORDER_TYPES_MAP)
