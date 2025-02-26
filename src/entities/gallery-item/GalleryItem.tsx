'use client'

import { ComponentProps, useState } from 'react'

import Image from 'next/image'

import { URL_BASE_IMAGE_FILE } from '@/shared/api/constants'
import { MainItem } from '@/shared/api/types'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'

import { PrivateButton } from './ui/private-button'
import { PublicButton } from './ui/public-button'

// import { track } from '@/shared/lib/utils/mixpanel'

interface GalleryItemProps extends ComponentProps<'div'> {
  item: MainItem
  actionSlot?: React.ReactNode
  inViewRef?: React.Ref<HTMLButtonElement>
}

export const GalleryItem = (props: GalleryItemProps) => {
  const {
    id,
    name: modelName,
    description,
    encryptedThumbnailPath
  } = props.item
  const [isHovering, setIsHovering] = useState(true)
  const isAuth = useAuthStore((state) => state.isAuth)

  const imgUrl =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? encryptedThumbnailPath
      : process.env.NEXT_PUBLIC_API_URL +
        URL_BASE_IMAGE_FILE +
        encryptedThumbnailPath

  const isMember = isAuth === true

  return (
    <div>
      <button
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        className="relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[8px] bg-neutral-1 align-top focus:outline-none focus-visible:border focus-visible:border-white focus-visible:ring-2 focus-visible:ring-ring"
        ref={props.inViewRef}
      >
        <Image
          src={imgUrl}
          alt={description}
          fill
          style={{ objectFit: 'cover' }}
        />
        {isHovering && (
          <div className="absolute inset-0 z-[5] bg-custom-gradient hover:cursor-pointer">
            {isMember ? (
              <PrivateButton
                modelInfo={props.item}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[rgba(97,98,104,0.5)] text-white hover:border-border hover:text-white"
              />
            ) : (
              <PublicButton
                modelId={id}
                modelName={modelName}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[rgba(97,98,104,0.5)] text-white hover:border-border hover:text-white"
              />
            )}
          </div>
        )}
        {isHovering && props.actionSlot && (
          <div className="absolute right-2 top-2 z-10">{props.actionSlot}</div>
        )}
      </button>
      <p className="mt-3 text-center text-[0.875rem] font-medium text-neutral-7">
        {props.item.name}
      </p>
    </div>
  )
}
