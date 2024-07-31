'use client'

import { Banner } from '@/features/explore/ui/Banner'
import { Card } from '@/features/Card'

import BG1 from '/public/images/model-gen-1.png'
import BG2 from '/public/images/model-gen-2.png'
import BG3 from '/public/images/model-gen-3.png'

const cardList = [
  { imgUrl: BG1, id: 'aaa' },
  { imgUrl: BG2, id: 'bbb' },
  { imgUrl: BG3, id: 'ccc' },
  { imgUrl: BG1, id: 'aaasdfa' },
  { imgUrl: BG2, id: 'bbasdfb' },
  { imgUrl: BG3, id: 'ccfwc' },
  { imgUrl: BG1, id: 'qwfwaaa' },
  { imgUrl: BG2, id: 'bbasdfb' },
  { imgUrl: BG3, id: 'cccqwf' }
]

function Explore() {
  return (
    <>
      <Banner />
      <div className="mb-5">filters</div>
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
