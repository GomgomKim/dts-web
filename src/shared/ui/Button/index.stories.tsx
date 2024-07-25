import type { Meta, StoryObj } from '@storybook/react'

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
  args: { children: 'btn' }
}
