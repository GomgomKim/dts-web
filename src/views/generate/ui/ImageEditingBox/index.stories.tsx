import type { Meta, StoryObj } from '@storybook/react'

import { ImageEditingBox } from '.'

const meta: Meta<typeof ImageEditingBox> = {
  component: ImageEditingBox,
  title: 'features/generate/imageEditingBox',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof ImageEditingBox>

export const Default: Story = {
  args: {}
}
