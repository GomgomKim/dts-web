'use client'

import React from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { useClientSearchParams } from '@/shared/lib/hooks/useClientSearchParams'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'
import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'

interface FilterProps extends React.ComponentPropsWithRef<'div'> {
  filterList: string[]
  id?: string
}

export const Filter = (props: FilterProps) => {
  const { filterList, ...restProps } = props
  const isMounted = React.useRef(false)
  const { element, onMoveToElement } = useMoveScroll()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const previousFilterType = useFilterTypeStore((state) => state.filterType)
  const setFilterType = useFilterTypeStore((state) => state.setFilterType)

  const { addSearchParams } = useClientSearchParams({ action: 'replace' })

  const currentFilterType =
    searchParams.get('filterType') ||
    (pathname.startsWith('/explore')
      ? filterList[0].toUpperCase()
      : previousFilterType)

  const handleClickFilter = (type: string) => {
    addSearchParams({ filterType: type })
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
