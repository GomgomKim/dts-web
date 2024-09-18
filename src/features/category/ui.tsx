'use client'

import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { useFilterTypeStore } from '@/shared/lib/stores/useFilterTypeStore'

interface CategoryProps extends React.ComponentPropsWithRef<'div'> {
  categoryList: string[]
  id?: string
  element?: React.RefObject<HTMLDivElement>
}

const Category = (props: CategoryProps) => {
  const { categoryList, ...restProps } = props
  const searchParams = useSearchParams()

  const setFilterType = useFilterTypeStore((state) => state.setFilterType)

  const currentTagType = searchParams.get('filterType') || categoryList[0]

  const { handleQueryString } = useSetQueryString({ option: 'replace' })

  const handleClickCategory = (type: string) => {
    setFilterType(type)
    handleQueryString([{ filterType: type }])
  }

  return (
    <div {...restProps} id={props.id} ref={props.element}>
      {props.categoryList.map((type) => (
        <Button
          variant="ghost"
          key={type}
          className={cn({ active: type === currentTagType })}
          onClick={() => handleClickCategory(type)}
        >
          {capitalizeType(type)}
        </Button>
      ))}
    </div>
  )
}
export { Category }

const capitalizeType = (type: string) => {
  return type[0].toUpperCase() + type.slice(1, type.length).toLocaleLowerCase()
}
