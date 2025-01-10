import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'shared/Checkbox',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        checked={checked}
        onCheckedChange={() => setChecked((prev) => !prev)}
      />
    )
  }
}
