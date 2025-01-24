import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle
} from '@/shared/ui/card'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '@/shared/ui/labeled-detail'
import { ModelStatus } from '@/shared/ui/model-status'

import modelImage from '/public/images/dayoung-1_1-FRONT-watermark.webp'

import { UI_TEXT } from '../../../model/constants'

interface CurrentPlanCardProps {
  isSubscribing: boolean
}

export const CurrentPlanCard = (props: CurrentPlanCardProps) => {
  return (
    <Card className="flex-1">
      <div className="flex">
        <div className="flex grow flex-col justify-between">
          <CardHeader className="flex items-center gap-[11px] pr-5 ">
            <CardTitle>{UI_TEXT.CURRENT_PLAN}</CardTitle>
            <ModelStatus isActive={props.isSubscribing} />
          </CardHeader>
          <CardContent className="space-y-4 pr-5">
            <LabeledDetail>
              <LabeledDetailLabel>{UI_TEXT.MODEL}</LabeledDetailLabel>
              <LabeledDetailDetail>
                <span>{props.isSubscribing ? '1' : '0'}</span>
                <span className="text-neutral-7">
                  {' '}
                  / {props.isSubscribing ? '1 Model' : '0 Model'}
                </span>
              </LabeledDetailDetail>
            </LabeledDetail>
            <LabeledDetail>
              <LabeledDetailLabel>{UI_TEXT.CREDITS}</LabeledDetailLabel>
              <LabeledDetailDetail>
                <span>{props.isSubscribing ? '20' : '0'}</span>
                <span className="text-neutral-7">
                  {' '}
                  / {props.isSubscribing ? '20' : '0'} {UI_TEXT.CREDITS}
                </span>
              </LabeledDetailDetail>
            </LabeledDetail>
            <LabeledDetail>
              <LabeledDetailLabel>{UI_TEXT.SUBSCRIPTION}</LabeledDetailLabel>
              <LabeledDetailDetail>
                <>
                  {props.isSubscribing
                    ? UI_TEXT.RENEWS_ON + '2024. 12. 25'
                    : UI_TEXT.SUBSCRIPTION_EXPIRED}
                </>
              </LabeledDetailDetail>
            </LabeledDetail>
          </CardContent>
        </div>
        <div className="shrink-0">
          <CardImage className="pb-5 pl-0">
            <div className="relative aspect-[120/200] min-w-[120px] overflow-hidden rounded-[0.5rem]">
              <Image
                src={modelImage}
                alt=""
                fill
                className={cn(
                  'object-cover',
                  props.isSubscribing ? '' : 'grayscale-[50]'
                )}
              />
            </div>
          </CardImage>
        </div>
      </div>
      <CardFooter className="flex gap-5">
        <Button variant="outline" stretch asChild>
          <Link href="/pricing">
            {props.isSubscribing
              ? UI_TEXT.UPGRADE_PLAN
              : UI_TEXT.REACTIVATE_PLAN}
          </Link>
        </Button>
        <Button variant="primary" stretch className="font-semibold" asChild>
          <Link href="/my-account/my-models">{UI_TEXT.VIEW_MY_MODELS}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
