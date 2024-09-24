'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'

import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface FilterProps extends React.ComponentPropsWithRef<'div'> {
  filterList: string[]
  id?: string
  element?: React.RefObject<HTMLDivElement>
}

export const Filter = (props: FilterProps) => {
  const { filterList, ...restProps } = props
  const searchParams = useSearchParams()

  const setFilterType = useFilterTypeStore((state) => state.setFilterType)

  const currentFilterType =
    searchParams.get('filterType') || filterList[0].toUpperCase()

  const { handleQueryString } = useSetQueryString({ option: 'replace' })

  const handleClickFilter = (type: string) => {
    // setFilterType(type)
    handleQueryString([{ filterType: type }])
  }

  React.useEffect(() => {
    currentFilterType && setFilterType(currentFilterType)
  }, [searchParams])

  return (
    <div {...restProps} id={props.id} ref={props.element}>
      {filterList.map((type) => (
        <Button
          variant="ghost"
          key={type}
          className={cn({ active: type === currentFilterType })}
          onClick={() => handleClickFilter(type)}
        >
          {capitalizeType(type)}
        </Button>
      ))}
    </div>
  )
}

const capitalizeType = (type: string) => {
  return type[0].toUpperCase() + type.slice(1, type.length).toLocaleLowerCase()
}
