import { useMemo } from 'react'

import Image from 'next/image'
import { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Button } from '@/shared/ui'

import Dahye from '/public/images/dahye-1_1-FRONT-watermark.webp'
import Dayoung from '/public/images/dayoung-1_1-FRONT-watermark.webp'
import Yewon from '/public/images/yewon-1_1-FRONT-watermark.webp'
import Yuna from '/public/images/yuna-1_1-FRONT-watermark.webp'
import Yuri from '/public/images/yuri-1_1-FRONT-watermark.webp'

import { UI_TEXT } from '../../model/constants'

const images = [
  { src: Yuna, alt: 'Yuna' },
  { src: Yewon, alt: 'Yewon' },
  { src: Yuri, alt: 'Yuri' },
  { src: Dayoung, alt: 'Dayoung' },
  { src: Dahye, alt: 'Dahye' }
]

interface PromotionBannerProps {
  isSubscribing: boolean
}
export const PromotionBanner = (props: PromotionBannerProps) => {
  const promoteParagraph = props.isSubscribing ? (
    <>
      {UI_TEXT.PROMOTE_SUBSCRIBING_1}{' '}
      <span className="text-[1.5rem] font-semibold text-white">
        3 {UI_TEXT.PROMOTE_SUBSCRIBING_2}
      </span>{' '}
      {UI_TEXT.PROMOTE_SUBSCRIBING_3}
      <br />
      {UI_TEXT.PROMOTE_SUBSCRIBING_4}
    </>
  ) : (
    <>
      {UI_TEXT.PROMOTE_NOT_SUBSCRIBING_1}
      <br />
      {UI_TEXT.PROMOTE_NOT_SUBSCRIBING_2}
    </>
  )

  const promoteButtonText = props.isSubscribing
    ? UI_TEXT.BUTTON_BROWSE_MODELS
    : UI_TEXT.BUTTON_DISCOVER_MODEL

  const memoizedImageList = useMemo(() => {
    return images.map((image) => (
      <li key={image.alt}>
        <Card src={image.src} alt={image.alt} />
      </li>
    ))
  }, [images])

  return (
    <div className="w-full text-center">
      <div className="mb-5 text-[1.5rem] font-semibold text-neutral-7">
        {promoteParagraph}
      </div>
      <Button variant="outline" className="py-3" asChild>
        <Link href="/explore">{promoteButtonText}</Link>
      </Button>
      <div className="relative mx-[-40px] mt-10 h-[328px] overflow-y-auto overflow-x-hidden">
        <ul className="absolute left-1/2 flex -translate-x-1/2 gap-5">
          {memoizedImageList}
        </ul>
      </div>
    </div>
  )
}

interface CardProps {
  src: StaticImageData
  alt: string
}

function Card(props: CardProps) {
  return (
    <div className="relative aspect-[172/328] h-[328px] overflow-hidden rounded-[0.5rem] md:aspect-[9/16]">
      <Image
        src={props.src}
        alt={props.alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
