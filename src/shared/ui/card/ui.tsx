'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import LinkIcon from '/public/icons/arrow-thin.svg'
import { ModelImageItem } from '@/features/explore/CardList/model'

const URL_BASE_IMAGE_FILE = '/image-file/base-image'

type Props = {
  item: ModelImageItem
  actionSlot?: React.ReactNode
}

const Card = (props: Props) => {
  const { encodedBaseImageId, name: modelname, description } = props.item
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
      {isHovering && props.actionSlot && (
        <div className="absolute top-2 right-2 z-10">{props.actionSlot}</div>
      )}
    </div>
  )
}

export { Card }
