'use client'

import { FilterDropdown } from '@/features/filter-dropdown'
import { useFilter } from '@/features/filter-dropdown/model/useFilter'

import { useClientSearchParams } from '@/shared/lib/hooks/useClientSearchParams'

import {
  ORDER_OPTIONS,
  ORDER_TYPES_MAP,
  ORDER_TYPES_REVERT_MAP
} from './constant'

export const OrderDropdown = () => {
  const { addSearchParams } = useClientSearchParams({ action: 'replace' })

  const { value, handleChangeValue } = useFilter({
    searchParamKey: 'order',
    options: ORDER_OPTIONS,
    optionsType: {
      typeMap: ORDER_TYPES_MAP,
      revertTypeMap: ORDER_TYPES_REVERT_MAP
    },
    onChangeValue: (value) => {
      addSearchParams({
        order: ORDER_TYPES_MAP[value as keyof typeof ORDER_TYPES_MAP]
      })
    }
  })

  return (
    <div className="mb-5">
      <FilterDropdown
        title="ORDER"
        options={ORDER_OPTIONS}
        value={value}
        handleChangeValue={handleChangeValue}
      />
    </div>
  )
}
