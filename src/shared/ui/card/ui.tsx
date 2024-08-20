'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import LinkIcon from '/public/icons/arrow-thin.svg'
import { ModelImageItem } from '@/features/explore/CardList/model'
import { LikeButton } from '@/features/favorites/LikeButton'

const URL_BASE_IMAGE_FILE = '/image-file/base-image'

interface CardProps {
  item: ModelImageItem
}

const Card = ({ item }: CardProps) => {
  const { encodedBaseImageId, name: modelname, description, isFavorite } = item
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
          `${URL_BASE_IMAGE_FILE}/` +
          encodedBaseImageId
        }
        alt={description}
        fill
        style={{ objectFit: 'cover' }}
      />
      {isHovering && (
        <Link
          href={`/archive/${modelname}?id=${encodedBaseImageId}`}
          className="absolute inset-0 z-10 bg-custom-gradient"
        >
          <LikeButton
            id={encodedBaseImageId}
            isFavorite={isFavorite}
            className="absolute top-2 right-2"
          />
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
