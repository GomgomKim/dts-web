import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'
import BG1 from '/public/images/model-gen-1.png'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'features/explore/Card',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: { imgUrl: BG1, id: 'modelname' }
}
