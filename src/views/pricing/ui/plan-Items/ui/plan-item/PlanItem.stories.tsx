import type { Meta, StoryObj } from '@storybook/react'

import { PLAN_ITEMS } from '../../model/constant'
import { PlanItem } from './PlanItem'

const meta: Meta<typeof PlanItem> = {
  component: PlanItem,
  title: 'pricing/PlanItem',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof PlanItem>

export const Default: Story = {
  args: { ...PLAN_ITEMS[0] }
}
