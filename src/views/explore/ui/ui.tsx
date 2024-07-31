'use client'

import { Banner } from '@/features/explore/ui/Banner'
import { Card } from '@/features/Card'

import BG1 from '/public/images/model-gen-1.png'
import BG2 from '/public/images/model-gen-2.png'
import BG3 from '/public/images/model-gen-3.png'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/RadioGroup'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { Button } from '@/sdcn/components/ui/Button'

const cardList = [
  { imgUrl: BG1, id: 'aaa' },
  { imgUrl: BG2, id: 'bbb' },
  { imgUrl: BG3, id: 'ccc' },
  { imgUrl: BG1, id: 'aaasdfa' },
  { imgUrl: BG2, id: 'wasdf' },
  { imgUrl: BG3, id: 'ccfwc' },
  { imgUrl: BG1, id: 'qwfwaaa' },
  { imgUrl: BG2, id: 'bbasdfb' },
  { imgUrl: BG3, id: 'cccqwf' }
]

const searchOptions = [
  { value: 'FEATURED', label: 'Featured' },
  { value: 'MAKEUP', label: 'Makeup' },
  { value: 'SKINCARE', label: 'Skincare' },
  { value: 'HAIR', label: 'Hair' }
]

function Explore() {
  const [query, setQuery] = useState('featured')

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
        {cardList.map((cardItem) => (
          <div key={cardItem.id}>
            <Card imgUrl={cardItem.imgUrl} id={cardItem.id} />
          </div>
        ))}
      </div>
    </>
  )
}
export default Explore
