import type { Meta, StoryObj } from '@storybook/react'

import { Nullbox } from '.'

const meta: Meta<typeof Nullbox> = {
  component: Nullbox,
  title: 'entities/favoriates/Nullbox',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Nullbox>

export const Default: Story = {
  args: {}
}
