'use client'

import { ComponentProps, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

import { MainItem } from '@/shared/api/types'
import { Button } from '@/shared/ui/button'

import LinkIcon from '/public/icons/arrow-thin.svg'

const URL_BASE_IMAGE_FILE = '/image-file/download?encryptedImageUrl='

interface CardProps extends ComponentProps<'div'> {
  item: MainItem
  actionSlot?: React.ReactNode
  inViewRef?: React.Ref<HTMLButtonElement>
}

export const Card = (props: CardProps) => {
  const { id, name: modelname, description, encryptedThumbnailUrl } = props.item
  const [isHovering, setIsHovering] = useState(false)
  const router = useRouter()
  const isAuth = useAuthStore((state) => state.isAuth)

  const imgUrl =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? encryptedThumbnailUrl
      : process.env.NEXT_PUBLIC_API_URL +
        `${URL_BASE_IMAGE_FILE}` +
        encryptedThumbnailUrl

  const isMember = isAuth === true
  const CardWrapper = isMember ? Link : 'div'

  const handleClickCard = (info: string) => {
    if (!isMember) {
      router.push('/signup', { scroll: false })
      return
    }
    // TODO: 로그인 창으로 이동할 때 modelId를 같이 보내줘야함
    console.log('click card', info)
  }

  return (
    <button
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      className="relative aspect-[9/16] rounded-[8px] overflow-hidden cursor-auto bg-neutral-1 focus:outline-none focus-visible:border-white focus-visible:border-1 focus-visible:ring-2 focus-visible:ring-ring"
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
          onClick={() => handleClickCard(`/${modelname}?id=${id}`)}
          className="absolute inset-0 z-10 bg-custom-gradient hover:cursor-pointer"
        >
          <Button
            asChild
            variant="sub1"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white border-[rgba(97,98,104,0.5)] hover:border-border"
          >
            <div>
              Start with This Model
              <LinkIcon className="stroke-white" />
            </div>
          </Button>
        </CardWrapper>
      )}
      {isHovering && props.actionSlot && (
        <div className="absolute top-2 right-2 z-10">{props.actionSlot}</div>
      )}
    </button>
  )
}
