import type { Meta, StoryObj } from '@storybook/react'

import { Banner } from '.'

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: 'features/Banner',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Banner>

export const Default: Story = {
  args: {}
}
