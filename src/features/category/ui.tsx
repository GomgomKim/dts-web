'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'

type CategoryProps = {
  categoryList: string[]
}

const Category = ({ categoryList }: CategoryProps) => {
  const searchParams = useSearchParams()

  const currentTagType = searchParams.get('tagType')
  const [query, setQuery] = useState(currentTagType || categoryList[0])

  useSetQueryString({ queryParams: [{ tagType: query }] })

  return (
    <div className="mb-5">
      {categoryList.map((type) => (
        <Button
          variant="ghost"
          key={type}
          className={cn({ active: type === currentTagType })}
          onClick={() => setQuery(type)}
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
