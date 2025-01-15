import Image from 'next/image'

import modelImage from '/public/images/dayoung-1_1-FRONT-watermark.webp'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import {
  LabeledDetail,
  LabeledDetailDetail,
  LabeledDetailLabel
} from '../labeled-detail'
import { ModelStatus } from '../model-status'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle
} from './Card'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    )
  }
}

export const WithoutContent: Story = {
  render: () => {
    return (
      <>
        {/* My Account > My Models */}
        <Card>
          <CardHeader>
            <div className="p-5 text-center">3 / 5 Models</div>
          </CardHeader>
          <CardFooter>
            <Button stretch>Browse Models</Button>
          </CardFooter>
        </Card>
      </>
    )
  }
}

export const WithoutImage: Story = {
  render: () => {
    return (
      <>
        {/* My Account - subscriptions */}
        <Card className="flex flex-col">
          <div className="flex grow flex-col justify-between">
            <CardHeader className="pr-5">
              <CardTitle>Billing & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pr-5">
              <LabeledDetail>
                <LabeledDetailLabel>Price</LabeledDetailLabel>
                <LabeledDetailDetail>$100 for 1 Model</LabeledDetailDetail>
              </LabeledDetail>
              <LabeledDetail>
                <LabeledDetailLabel>Billing Period</LabeledDetailLabel>
                <LabeledDetailDetail>Monthly</LabeledDetailDetail>
              </LabeledDetail>
              <LabeledDetail>
                <LabeledDetailLabel>Renewal date</LabeledDetailLabel>
                <LabeledDetailDetail>
                  Renews on 2024. 12. 25
                </LabeledDetailDetail>
              </LabeledDetail>
              <CardDescription className="mt-3 text-end">
                *Renews automatically unless canceled
              </CardDescription>
            </CardContent>
          </div>
          <CardFooter className="flex gap-5">
            <Button variant="outline" stretch>
              Manage Subscription
            </Button>
          </CardFooter>
        </Card>
        {/* My Account - credits */}
        <Card className="flex flex-col">
          <div className="flex grow flex-col justify-between">
            <CardHeader className="pr-5">
              <CardTitle>Remaining Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pr-5">
              <div className="mb-5 text-right">
                <span className="text-[2.5rem]">20</span>
                <span className="text-neutral-7"> / 100 credits</span>
              </div>
              <LabeledDetail>
                <LabeledDetailLabel>Subscription Credits</LabeledDetailLabel>
                <LabeledDetailDetail>
                  <span>20</span>
                  <span className="text-neutral-7"> / 100 credits</span>
                </LabeledDetailDetail>
              </LabeledDetail>
              <LabeledDetail>
                <LabeledDetailLabel>Purchased Credits</LabeledDetailLabel>
                <LabeledDetailDetail>
                  <span>0</span>
                  <span className="text-neutral-7"> credits</span>
                </LabeledDetailDetail>
              </LabeledDetail>
            </CardContent>
          </div>
          <CardFooter className="flex gap-5">
            <Button variant="outline" stretch>
              Upgrade Plan
            </Button>
            <Button stretch>Add Credits</Button>
          </CardFooter>
        </Card>
      </>
    )
  }
}

export const WithImage: Story = {
  render: () => {
    return (
      <>
        {/* My Account - subscriptions */}
        <Card>
          <div className="flex">
            <div className="flex grow flex-col justify-between">
              <CardHeader className="flex items-center gap-[11px] pr-5 ">
                <CardTitle>Current Plan</CardTitle>
                <ModelStatus isActive={true} />
              </CardHeader>
              <CardContent className="space-y-4 pr-5">
                <LabeledDetail>
                  <LabeledDetailLabel>Model</LabeledDetailLabel>
                  <LabeledDetailDetail>
                    <span>1</span>
                    <span className="text-neutral-7"> / 1 Model</span>
                  </LabeledDetailDetail>
                </LabeledDetail>
                <LabeledDetail>
                  <LabeledDetailLabel>Credits</LabeledDetailLabel>
                  <LabeledDetailDetail>
                    <span>20</span>
                    <span className="text-neutral-7"> / 20 credits</span>
                  </LabeledDetailDetail>
                </LabeledDetail>
                <LabeledDetail>
                  <LabeledDetailLabel>Subscription</LabeledDetailLabel>
                  <LabeledDetailDetail>
                    <span>Renews on 2024. 12. 25</span>
                  </LabeledDetailDetail>
                </LabeledDetail>
              </CardContent>
            </div>
            <div className="shrink-0">
              <CardImage className="pb-5 pl-0">
                <div className="relative aspect-[120/200] min-w-[120px] overflow-hidden rounded-[0.5rem]">
                  <Image
                    src={modelImage}
                    alt="Placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardImage>
            </div>
          </div>
          <CardFooter className="flex gap-5">
            <Button variant="outline" stretch>
              Upgrade Plan
            </Button>
            <Button variant="primary" stretch>
              View My Models
            </Button>
          </CardFooter>
        </Card>
        {/* My Account - subscriptions > My Models */}
        <Card className="p-2">
          <div className="flex">
            <div className="flex grow flex-col justify-between">
              <CardHeader className="pr-5">
                <ModelStatus isActive={false} />
              </CardHeader>
              <CardContent className="space-y-5 pr-5">
                <LabeledDetail className="flex-col">
                  <LabeledDetailLabel>Model Name</LabeledDetailLabel>
                  <LabeledDetailDetail className="text-[1.125rem]">
                    Hanseo
                  </LabeledDetailDetail>
                </LabeledDetail>
                <LabeledDetail className="flex-col">
                  <LabeledDetailLabel>Subscription</LabeledDetailLabel>
                  <LabeledDetailDetail className="text-[1.125rem]">
                    Ends on 2025. 1. 1
                  </LabeledDetailDetail>
                </LabeledDetail>
              </CardContent>
            </div>
            <div className="shrink-0">
              <CardImage className="pb-5 pl-0">
                <div className="relative aspect-[160/240] min-w-[120px] overflow-hidden rounded-[0.5rem]">
                  <Image
                    src={modelImage}
                    alt="Placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardImage>
            </div>
          </div>
        </Card>
      </>
    )
  }
}
