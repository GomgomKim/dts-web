'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { useTagTypeStore } from '@/features/filter-tag-types/model/useTagTypeStore'

import { useClientSearchParams } from '@/shared/lib/hooks/useClientSearchParams'
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll'
import { capitalizeFirstLetter, cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface FilterTagTypesProps extends React.ComponentPropsWithRef<'div'> {
  filterList: string[]
  id?: string
}

export const FilterTagTypes = (props: FilterTagTypesProps) => {
  const { filterList, ...restProps } = props
  const isMounted = React.useRef(false)
  const { element, onMoveToElement } = useMoveScroll()
  const pathname = usePathname()

  const previousTagType = useTagTypeStore((state) => state.tagType)
  const setTagType = useTagTypeStore((state) => state.setTagType)

  const { searchParams, addSearchParams } = useClientSearchParams({
    action: 'replace'
  })

  const currentTagType =
    searchParams.get('tagType') ||
    (pathname.startsWith('/explore')
      ? filterList[0].toUpperCase()
      : previousTagType)

  const handleClickFilter = (type: string) => {
    addSearchParams({ tagType: type })
  }

  React.useEffect(() => {
    searchParams.get('tagType') !== null && setTagType(currentTagType)

    if (isMounted.current) {
      if (searchParams.get('tagType') !== null) {
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
          className={cn(
            'h-10 rounded-[0.5rem] p-3 text-[0.875rem] font-medium',
            {
              'bg-secondary text-white': type === currentTagType
            }
          )}
          onClick={() => handleClickFilter(type)}
        >
          {capitalizeFirstLetter(type)}
        </Button>
      ))}
    </div>
  )
}
