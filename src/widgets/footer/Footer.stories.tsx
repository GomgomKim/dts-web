import type { Meta, StoryObj } from '@storybook/react'

import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'widgets/Footer',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {}
}
