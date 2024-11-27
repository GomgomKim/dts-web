import Image, { StaticImageData } from 'next/image'

import { Banner } from '@/views/explore/ui/banner'

import Dahye from '/public/images/dahye-1_1-FRONT-watermark.webp'
import Dayoung from '/public/images/dayoung-1_1-FRONT-watermark.webp'
import Yewon from '/public/images/yewon-1_1-FRONT-watermark.webp'
import Yuna from '/public/images/yuna-1_1-FRONT-watermark.webp'
import Yuri from '/public/images/yuri-1_1-FRONT-watermark.webp'

import { CallToActionButtons } from '../explore/ui/call-to-action-buttons'

export default function Mobile() {
  const images = [
    { src: Yuna, alt: 'Yuna' },
    { src: Yewon, alt: 'Yewon' },
    { src: Yuri, alt: 'Yuri' },
    { src: Dayoung, alt: 'Dayoung' },
    { src: Dahye, alt: 'Dahye' }
  ]

  return (
    <div className="relative h-full overflow-y-auto overflow-x-hidden">
      <div className="m-6 mb-12">
        <Banner />
        <CallToActionButtons />
      </div>
      <ul className="absolute left-1/2 flex -translate-x-1/2 gap-2 pb-5">
        {images.map((image) => (
          <li key={image.alt}>
            <Card src={image.src} alt={image.alt} />
          </li>
        ))}
      </ul>
    </div>
  )
}

interface CardProps {
  src: StaticImageData
  alt: string
}

function Card(props: CardProps) {
  return (
    <div className="relative aspect-[9/16] h-[160px] overflow-hidden rounded-[3.2px]">
      <Image
        src={props.src}
        alt={props.alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
