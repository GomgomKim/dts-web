import type { Meta, StoryObj } from '@storybook/react'

import { ImageInputBox } from '.'

const meta: Meta<typeof ImageInputBox> = {
  component: ImageInputBox,
  title: 'features/archive/ImageInputBox',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof ImageInputBox>

export const Default: Story = {}
