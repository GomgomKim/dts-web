'use client'

import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'

type CategoryProps = {
  categoryList: string[]
}

const Category = ({ categoryList }: CategoryProps) => {
  const searchParams = useSearchParams()

  const currentTagType = searchParams.get('filterType') || categoryList[0]

  const { handleQueryString } = useSetQueryString({ option: 'replace' })

  return (
    <div>
      {categoryList.map((type) => (
        <Button
          variant="ghost"
          key={type}
          className={cn({ active: type === currentTagType })}
          onClick={() => handleQueryString([{ filterType: type }])}
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
