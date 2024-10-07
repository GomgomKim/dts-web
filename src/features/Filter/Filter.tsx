'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'

import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface FilterProps extends React.ComponentPropsWithRef<'div'> {
  filterList: string[]
  id?: string
}

export const Filter = (props: FilterProps) => {
  const { filterList, ...restProps } = props
  const isMounted = React.useRef(false)
  const { element, onMoveToElement } = useMoveScroll()

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
      if (searchParams.get('filterType') !== null) {
        onMoveToElement()
      }
    } else {
      isMounted.current = true
    }
  }, [searchParams])

  return (
    <div
      {...restProps}
      id={props.id}
      ref={element}
      className="scroll-mt-[56px]"
    >
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
