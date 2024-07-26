import type { Meta, StoryObj } from '@storybook/react'

import Link from 'next/link'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'shadn/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'secondary', 'destructive', 'link']
    },
    asChild: { control: 'boolean' },
    disabled: { control: 'boolean' },
    stretch: { control: 'boolean' }
  }
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: ({ ...arg }) => {
    return <Button {...arg}>default</Button>
  }
}

export const Destructive: Story = {
  render: () => {
    return <Button variant="destructive">destructive</Button>
  }
}

export const Outline: Story = {
  render: () => {
    return <Button variant="outline">outline</Button>
  }
}

export const Secondary: Story = {
  render: () => {
    return <Button variant="secondary">secondary</Button>
  }
}

export const Ghost: Story = {
  render: () => {
    return <Button variant="ghost">ghost</Button>
  }
}

export const LinkUnderline: Story = {
  render: () => {
    return <Button variant="link">Link</Button>
  }
}

export const LinkButton: Story = {
  render: () => {
    return (
      <>
        <Button asChild>
          <Link href="#">Get Started for Free</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#">See Examples</Link>
        </Button>
      </>
    )
  }
}

export const IconButton: Story = {
  render: () => {
    return (
      <>
        <Button asChild variant="secondary" size="icon">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3334 2.66679V6.66679M15.3334 6.66679H11.3334M15.3334 6.66679L12.2401 3.76013C11.5236 3.04327 10.6372 2.5196 9.66354 2.23798C8.68992 1.95636 7.66082 1.92597 6.67227 2.14964C5.68373 2.37331 4.76795 2.84375 4.01039 3.51708C3.25284 4.1904 2.67819 5.04466 2.34008 6.00013M0.666748 13.3335V9.33346M0.666748 9.33346H4.66675M0.666748 9.33346L3.76008 12.2401C4.47658 12.957 5.363 13.4807 6.33662 13.7623C7.31025 14.0439 8.33934 14.0743 9.32789 13.8506C10.3164 13.627 11.2322 13.1565 11.9898 12.4832C12.7473 11.8099 13.322 10.9556 13.6601 10.0001"
                stroke="#AEAFB5"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Button>
        <Button asChild variant="secondary" size="icon">
          <div>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 4.49992V13.8333C3.33333 14.1869 3.47381 14.526 3.72386 14.7761C3.97391 15.0261 4.31304 15.1666 4.66667 15.1666H11.3333C11.687 15.1666 12.0261 15.0261 12.2761 14.7761C12.5262 14.526 12.6667 14.1869 12.6667 13.8333V4.49992H3.33333ZM3.33333 4.49992H2M3.33333 4.49992H14M5.33333 4.49992V3.16659C5.33333 2.81296 5.47381 2.47382 5.72386 2.22378C5.97391 1.97373 6.31304 1.83325 6.66667 1.83325H9.33333C9.68696 1.83325 10.0261 1.97373 10.2761 2.22378C10.5262 2.47382 10.6667 2.81296 10.6667 3.16659V4.49992"
                stroke="#AEAFB5"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Button>
      </>
    )
  }
}

export const Disabled: Story = {
  render: () => {
    return (
      <>
        <Button disabled>button</Button>
        <Button variant="outline" disabled>
          button
        </Button>
      </>
    )
  }
}

export const Stretch: Story = {
  render: () => {
    return (
      <>
        <Button stretch>button</Button>
        <Button variant="outline" stretch>
          button
        </Button>
      </>
    )
  }
}
