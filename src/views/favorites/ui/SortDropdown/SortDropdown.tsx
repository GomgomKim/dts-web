'use client'

import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'

import ChevronIcon from '/public/icons/angle-bracket-open.svg'

import { SortingType } from '../../types'
import {
  SORTING_TYPES,
  SORTING_TYPE_LABEL_MAP,
  SORTING_TYPE_MAP,
  SORTING_TYPE_REVER_MAP,
  SORT_OPTIONS
} from './constant'

export const SortDropdown = () => {
  const searchParams = useSearchParams()
  const sortingType = searchParams.get('sortingType') || SORTING_TYPES[0]
  const { handleQueryString } = useSetQueryString({ option: 'replace' })

  const [sort, setSort] = React.useState(
    SORTING_TYPE_REVER_MAP[sortingType as SortingType]
  )

  const handleSortChange = (value: string) => {
    setSort(value)

    handleQueryString([{ sortingType: SORTING_TYPE_MAP[value] }])
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="group">
        <Button variant="ghost" className="p-3">
          <div className="flex items-center gap-[4px]">
            <span>{SORTING_TYPE_LABEL_MAP[sort]}</span>
            <span>
              <ChevronIcon className="transition-transform duration-300 group-data-[state=closed]:-rotate-90 group-data-[state=open]:rotate-90" />
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[140px] py-[0.75rem]">
        <DropdownMenuLabel>ORDER</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              onSelect={(e) => e.preventDefault()}
              isViewIndicator={false}
              isChecked={sort === option.value}
            >
              <span className="text-[0.875rem] font-normal">
                {option.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
