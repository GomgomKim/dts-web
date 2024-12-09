'use client'

import { FilterDropdown } from '@/features/filter-dropdown'
import { useFilter } from '@/features/filter-dropdown/model/useFilter'

import {
  MEDIA_TYPES_MAP,
  MEDIA_TYPES_REVERT_MAP,
  MEDIA_TYPE_OPTIONS
} from './constant'

interface MediaTypeDropdownProps {
  onChangeValue: (value: string) => void
}

export const MediaTypeDropdown = (props: MediaTypeDropdownProps) => {
  const { value, handleChangeValue } = useFilter({
    searchParamKey: 'mediaType',
    options: MEDIA_TYPE_OPTIONS,
    optionsType: {
      typeMap: MEDIA_TYPES_MAP,
      revertTypeMap: MEDIA_TYPES_REVERT_MAP
    },
    onChangeValue: props.onChangeValue
  })

  return (
    <FilterDropdown
      title="TYPE"
      options={MEDIA_TYPE_OPTIONS}
      value={value}
      handleChangeValue={handleChangeValue}
    />
  )
}
