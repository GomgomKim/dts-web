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
  onClickFilter?: () => void
}

export const Filter = (props: FilterProps) => {
  const { filterList, onClickFilter, ...restProps } = props
  const isMounted = React.useRef(false)
  const searchParams = useSearchParams()
  const setFilterType = useFilterTypeStore((state) => state.setFilterType)

  const { handleQueryString } = useSetQueryString({ action: 'replace' })

  const currentFilterType =
    searchParams.get('filterType') || filterList[0].toUpperCase()

  const handleClickFilter = (type: string) => {
    handleQueryString([{ filterType: type }])
  }

  React.useEffect(() => {
    searchParams.get('filterType') !== null && setFilterType(currentFilterType)

    if (isMounted.current) {
      searchParams.get('filterType') !== null && onClickFilter?.()
    } else {
      isMounted.current = true
    }
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
