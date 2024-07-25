import type { Meta, StoryObj } from '@storybook/react'

import Link from 'next/link'

import { Button } from '.'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'shared/Button',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Button>

export const Variant: Story = {
  render: () => {
    return (
      <>
        <Button>default</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="link">link</Button>
      </>
    )
  }
}

export const LinkButton: Story = {
  render: () => {
    return (
      <>
        <Button asChild>
          <Link href="#">Get Started for Free</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="#">See Examples</Link>
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
        <Button variant="secondary" disabled>
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
        <Button variant="secondary" stretch>
          button
        </Button>
      </>
    )
  }
}
