'use client'

import { useState } from 'react'

import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { capitalizeFirstLetter, cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { Card, CardContent, CardHeader, CardImage } from '@/shared/ui/card'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'
import { ModelStatus } from '@/shared/ui/model-status'

import { UI_TEXT } from '../../../model/constants'

interface ModelCardItemProps {
  name: string
  endDate: string
  thumbnail: string | StaticImageData
  isActive: boolean
  isHoverable?: boolean
}

export const ModelCardItem = (props: ModelCardItemProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <Card
      className="relative min-h-[220px] flex-col md:min-h-[280px] lg:min-h-[304px]"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <div className="flex">
        <div className="flex grow flex-col justify-between">
          <CardHeader className="p-4 lg:p-8">
            <ModelStatus isActive={props.isActive} />
          </CardHeader>
          <CardContent className="space-y-5 p-5 pt-0 lg:p-8">
            <LabeledDetail className="flex-col">
              <LabeledDetailLabel>{UI_TEXT.MODEL_NAME}</LabeledDetailLabel>
              <LabeledDetailDetail className="text-[1.125rem]">
                {capitalizeFirstLetter(props.name)}
              </LabeledDetailDetail>
            </LabeledDetail>
            <LabeledDetail className="flex-col">
              <LabeledDetailLabel>{UI_TEXT.SUBSCRIPTION}</LabeledDetailLabel>
              <LabeledDetailDetail className="text-[1.125rem]">
                {/* TODO: end date format */}
                {props.isActive ? UI_TEXT.ENDS_ON : UI_TEXT.ENDED_ON}{' '}
                {props.endDate}
              </LabeledDetailDetail>
            </LabeledDetail>
          </CardContent>
        </div>
        <div className="shrink-0">
          {/* TODO: active 카드 썸네일 클릭시 generate 페이지로 이동 */}
          <CardImage className="p-5 pl-0 lg:p-8">
            <div className="relative aspect-[100/180] min-w-[100px] overflow-hidden rounded-[0.5rem] md:aspect-[160/240] md:min-w-[160px] ">
              <Image
                src={props.thumbnail}
                alt="Placeholder"
                fill
                className={cn(
                  'object-cover',
                  props.isActive ? '' : 'grayscale-[50]'
                )}
              />
            </div>
          </CardImage>
        </div>
      </div>
      {props.isHoverable && isHovering && (
        <div className="absolute inset-0 z-10 bg-custom-gradient">
          <Button
            asChild
            variant="outline"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-1/100"
          >
            <Link href="/pricing">{UI_TEXT.REACTIVATE_SUBSCRIPTION}</Link>
          </Button>
        </div>
      )}
    </Card>
  )
}
