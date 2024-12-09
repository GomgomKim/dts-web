'use client'

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

interface FilterProps {
  title: string
  options: { label: string; value: string }[]
  value: string
  handleChangeValue: (value: string) => void
}

export const FilterDropdown = (props: FilterProps) => {
  const VALUE_TO_LABEL_MAP = createValueToLabelMap(props.options)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="group">
        <Button variant="ghost" className="p-3">
          <div className="flex items-center gap-[4px]">
            <span className="text-[0.875rem] font-medium leading-[17px]">
              {VALUE_TO_LABEL_MAP[props.value]}
            </span>
            <span>
              <ChevronIcon className="transition-transform duration-300 group-data-[state=closed]:-rotate-90 group-data-[state=open]:rotate-90" />
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[140px] py-3">
        <DropdownMenuLabel>{props.title}</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={props.value}
          onValueChange={props.handleChangeValue}
        >
          {props.options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              onSelect={(e) => e.preventDefault()}
              isViewIndicator={false}
              isChecked={props.value === option.value}
            >
              <span className="text-[0.875rem] font-medium leading-[17px]">
                {option.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function createValueToLabelMap<T extends string, U extends string>(
  options: Array<{ label: U; value: T }>
): Record<T, U> {
  return options.reduce(
    (acc, { value, label }) => {
      acc[value] = label
      return acc
    },
    {} as Record<T, U>
  )
}
