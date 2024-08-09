'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import LikeIcon from '/public/icons/heart.svg'
import LinkIcon from '/public/icons/arrow-up-right.svg'
import { URL_EXPLORE_LIST_IMAGE } from '@/features/explore/card-list/constant'
import { ModelImageItem } from '@/features/explore/card-list/model'

interface CardProps {
  item: ModelImageItem
}

const Card = ({ item }: CardProps) => {
  const { encodedBaseImageId, name: modelname } = item
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-[400px] aspect-[9/16] rounded-[8px] overflow-hidden cursor-auto"
    >
      <Image
        src={
          process.env.NEXT_PUBLIC_API_URL +
          `${URL_EXPLORE_LIST_IMAGE}/` +
          encodedBaseImageId
        }
        alt=""
        fill
        style={{ objectFit: 'cover' }}
      />
      {isHovering && (
        <Link
          href={`/archive/${modelname}?id=${encodedBaseImageId}`}
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
            <div>
              Start with This Model
              <LinkIcon />
            </div>
          </Button>
        </Link>
      )}
    </div>
  )
}

export { Card }
