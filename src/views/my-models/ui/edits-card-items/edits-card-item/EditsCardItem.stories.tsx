import type { Meta, StoryObj } from '@storybook/react'

import { EditsCardItem } from './EditsCardItem'

const meta: Meta<typeof EditsCardItem> = {
  component: EditsCardItem,
  title: 'MyModels/Edits/EditsCardItem',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof EditsCardItem>

export const Default: Story = {
  args: {}
}
