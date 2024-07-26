import type { Meta, StoryObj } from '@storybook/react'

import { Menubar } from '.'

const meta: Meta<typeof Menubar> = {
  component: Menubar,
  title: 'widgets/Menubar',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Menubar>

export const Default: Story = {}
