'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { MainItem } from '@/shared/api/types'
import { Button } from '@/shared/ui/button'

import LinkIcon from '/public/icons/arrow-thin.svg'

const URL_BASE_IMAGE_FILE = '/image-file/download?encryptedImageUrl='

interface CardProps {
  item: MainItem
  actionSlot?: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { id, name: modelname, description, encryptedThumbnailUrl } = props.item
  const [isHovering, setIsHovering] = useState(false)

  const imgUrl =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? encryptedThumbnailUrl
      : process.env.NEXT_PUBLIC_API_URL +
        `${URL_BASE_IMAGE_FILE}` +
        encryptedThumbnailUrl

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative aspect-[9/16] rounded-[8px] overflow-hidden cursor-auto"
    >
      <Image
        src={imgUrl}
        alt={description}
        fill
        style={{ objectFit: 'cover' }}
      />
      {isHovering && (
        <Link
          href={`/archive/${modelname}?id=${id}`}
          className="absolute inset-0 z-10 bg-custom-gradient"
        >
          <Button
            asChild
            variant="outline"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
          >
            <div>
              Start with This Model
              <LinkIcon className="stroke-white" />
            </div>
          </Button>
        </Link>
      )}
      {isHovering && props.actionSlot && (
        <div className="absolute top-2 right-2 z-10">{props.actionSlot}</div>
      )}
    </div>
  )
}
