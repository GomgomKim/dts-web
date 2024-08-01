'use client'

import { Banner } from '@/features/explore/ui/Banner'
import { Card } from '@/features/Card'

import { RadioGroup, RadioGroupItem } from '@/shared/ui/RadioGroup'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useGetExploreImages from '../adapter'
import { URL_EXPLORE_LIST_IMAGE } from '../api/constants'
// import { Button } from '@/sdcn/components/ui/Button'

const TAG_TYPES = ['FEATURED', 'MAKEUP', 'SKINCARE', 'HAIR']

const searchOptions = [
  { value: TAG_TYPES[0], label: 'Featured' },
  { value: TAG_TYPES[1], label: 'Makeup' },
  { value: TAG_TYPES[2], label: 'Skincare' },
  { value: TAG_TYPES[3], label: 'Hair' }
]

function Explore() {
  const { data, status } = useGetExploreImages(TAG_TYPES[0])

  const [query, setQuery] = useState(TAG_TYPES[0])

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    console.log('query', query)
    router.push(pathname + '?' + createQueryString('tagType', query))
  }, [createQueryString, pathname, query, router])

  const handleQueryChange = (_id: string, value: string) => {
    setQuery(value)
  }

  if (status === 'pending') return 'loading...'
  if (status === 'error') return 'error!'

  return (
    <>
      <Banner />
      <div className="mb-5">
        {/* TODO: Button으로 변경할지 */}
        <RadioGroup
          id="explore"
          defaultValue="featured"
          value={query}
          onValueChange={handleQueryChange}
        >
          {searchOptions.map((option) => (
            <RadioGroupItem
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </div>
      <div className="grid grid-cols-auto-fill-px gap-5">
        {data?.content.images.map((cardItem) => (
          <div key={cardItem.id}>
            <Card
              imgUrl={
                process.env.NEXT_PUBLIC_API_URL +
                `${URL_EXPLORE_LIST_IMAGE}/` +
                cardItem.path
              }
              id={cardItem.id.toString()}
            />
          </div>
        ))}
      </div>
    </>
  )
}
export default Explore
