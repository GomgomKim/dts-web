import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupItem } from '.'
import { useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'shared/RadioGroup',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => {
    const options = [
      { id: 'option1', value: 'default', label: 'Default' },
      { id: 'option2', value: 'test', label: 'Test' }
    ]
    const [value, setValue] = useState('default')

    return (
      <>
        value: {value}
        <RadioGroup
          id="test"
          defaultValue="default"
          value={value}
          onValueChange={(value) => setValue(value)}
        >
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} label={option.label} />
            </div>
          ))}
        </RadioGroup>
      </>
    )
  }
}
