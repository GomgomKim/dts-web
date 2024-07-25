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

export const Default: Story = {
  render: () => {
    return <Button>button</Button>
  }
}

export const Stretch: Story = {
  render: () => {
    return <Button stretch>button</Button>
  }
}

export const LinkButton: Story = {
  render: () => {
    return <Button variant="link">login</Button>
  }
}

export const NavLink: Story = {
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
