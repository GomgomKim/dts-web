'use client'

import { ComponentProps, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { URL_BASE_IMAGE_FILE } from '@/shared/api/constants'
import { MainItem } from '@/shared/api/types'
import { useAuthStore } from '@/shared/lib/stores/useAuthStore'
import { track } from '@/shared/lib/utils/mixpanel'
import { Button } from '@/shared/ui/button'

import LinkIcon from '/public/icons/arrow-thin.svg'

interface GalleryItemProps extends ComponentProps<'div'> {
  item: MainItem
  actionSlot?: React.ReactNode
  inViewRef?: React.Ref<HTMLButtonElement>
}

export const GalleryItem = (props: GalleryItemProps) => {
  const {
    id,
    name: modelname,
    description,
    encryptedThumbnailPath,
    tags
  } = props.item
  const [isHovering, setIsHovering] = useState(false)
  const router = useRouter()
  const isAuth = useAuthStore((state) => state.isAuth)

  const imgUrl =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? encryptedThumbnailPath
      : process.env.NEXT_PUBLIC_API_URL +
        URL_BASE_IMAGE_FILE +
        encryptedThumbnailPath

  const isMember = isAuth === true
  const CardWrapper = isMember ? Link : 'div'

  const handleClickCard = (modelName: string, id: number) => {
    track.sendToMixpanel('select_model', {
      model_name: modelName,
      model_tag: tags.join(',')
    })
    if (!isMember) {
      router.push(`/login?name=${modelName}&id=${id}`, { scroll: false })
      return
    }
  }

  return (
    <button
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      className="relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[8px] bg-neutral-1 focus:outline-none focus-visible:border focus-visible:border-white focus-visible:ring-2 focus-visible:ring-ring"
      ref={props.inViewRef}
    >
      <Image
        src={imgUrl}
        alt={description}
        fill
        style={{ objectFit: 'cover' }}
      />
      {isHovering && (
        <CardWrapper
          href={isMember ? `/generate/${modelname}?id=${id}` : ''}
          onClick={() => handleClickCard(modelname, id)}
          className="absolute inset-0 z-10 bg-custom-gradient hover:cursor-pointer"
        >
          <Button
            asChild
            variant="outline"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[rgba(97,98,104,0.5)] text-white hover:border-border"
          >
            <div>
              Start with This Model
              <LinkIcon className="stroke-white" />
            </div>
          </Button>
        </CardWrapper>
      )}
      {isHovering && props.actionSlot && (
        <div className="absolute right-2 top-2 z-10">{props.actionSlot}</div>
      )}
    </button>
  )
}
