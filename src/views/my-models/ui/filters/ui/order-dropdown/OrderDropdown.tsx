'use client'

import { FilterDropdown } from '@/features/filter-dropdown'
import { useFilter } from '@/features/filter-dropdown/model/useFilter'

import {
  ORDER_OPTIONS,
  ORDER_TYPES_MAP,
  ORDER_TYPES_REVERT_MAP
} from './constant'

interface OrderDropdownProps {
  onChangeValue: (value: string) => void
}

export const OrderDropdown = (props: OrderDropdownProps) => {
  const { value, handleChangeValue } = useFilter({
    searchParamKey: 'order',
    options: ORDER_OPTIONS,
    optionsType: {
      typeMap: ORDER_TYPES_MAP,
      revertTypeMap: ORDER_TYPES_REVERT_MAP
    },
    onChangeValue: props.onChangeValue
  })

  return (
    <FilterDropdown
      title="ORDER"
      options={ORDER_OPTIONS}
      value={value}
      handleChangeValue={handleChangeValue}
    />
  )
}
