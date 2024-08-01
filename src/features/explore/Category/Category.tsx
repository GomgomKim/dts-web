'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/sdcn/components/ui/Button'
import { cn } from '@/sdcn/lib/utils'
import { TAG_TYPES } from '@/features/explore/Category/Category.constant'
import { useSetQueryString } from '@/features/explore/Category/hooks/useSetQueryString'

const Catergory = () => {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(TAG_TYPES[0])

  useSetQueryString('tagType', query)

  return (
    <div className="mb-5">
      {TAG_TYPES.map((type) => (
        <Button
          variant="ghost"
          key={type}
          className={cn({ active: type === searchParams.get('tagType') })}
          onClick={() => setQuery(type)}
        >
          {capitalizeType(type)}
        </Button>
      ))}
    </div>
  )
}
export { Catergory }

const capitalizeType = (type: string) => {
  return type[0].toUpperCase() + type.slice(1, type.length).toLocaleLowerCase()
}
