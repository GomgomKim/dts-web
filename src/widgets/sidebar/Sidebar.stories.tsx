import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from '.'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'widgets/Sidebar',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {}
