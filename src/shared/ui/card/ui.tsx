/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import LinkIcon from '/public/icons/arrow-thin.svg'
import { ModelImageItem } from '@/features/explore/CardList/model'

const URL_BASE_IMAGE_FILE = '/image-file/download?encryptedImageUrl='

type Props = {
  item: ModelImageItem
  actionSlot?: React.ReactNode
}

const Card = (props: Props) => {
  const {
    encodedImageInfoId,
    encodedMainImageId,
    name: modelname,
    description
  } = props.item
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-[400px] aspect-[9/16] rounded-[8px] overflow-hidden cursor-auto"
    >
      <img
        src={
          process.env.NEXT_PUBLIC_API_URL +
          `${URL_BASE_IMAGE_FILE}` +
          encodedMainImageId
        }
        alt={description}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
      {isHovering && (
        <Link
          href={`/archive/${modelname}?id=${encodedImageInfoId}`}
          className="absolute inset-0 z-10 bg-custom-gradient"
        >
          <Button
            asChild
            variant="link"
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white"
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

export { Card }
