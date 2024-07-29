'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button } from '@/sdcn/components/ui/Button'
import LikeIcon from '/public/icons/heart.svg'
import LinkIcon from '/public/icons/arrow-up-right.svg'

interface CardProps {
  imgUrl: string | StaticImageData
  id: string
}

export const Card = ({ imgUrl, id }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-[400px] aspect-[9/16] rounded-[8px] overflow-hidden cursor-auto"
    >
      <Image
        src={imgUrl}
        alt=""
        width={0}
        height={0}
        fill
        style={{ objectFit: 'cover' }}
      />
      {isHovering && (
        <Link
          href={'/' + id}
          className="absolute inset-0 z-10 bg-custom-gradient"
        >
          <Button
            asChild
            variant="secondary"
            size="icon"
            onClick={() => alert('clicked like button')}
            className="group absolute top-2 right-2"
          >
            <span>
              <LikeIcon className="stroke-current group-active:fill-primary group-active:stroke-primary" />
            </span>
          </Button>
          <Button
            asChild
            variant="link"
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white"
          >
            <span>
              Start with This Model
              <LinkIcon />
            </span>
          </Button>
        </Link>
      )}
    </div>
  )
}
