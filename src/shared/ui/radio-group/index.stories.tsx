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

    const handleValueChange = (value: string) => {
      setValue(value)
    }

    return (
      <>
        value: {value}
        <RadioGroup
          id="test"
          defaultValue="default"
          value={value}
          onChangeValue={handleValueChange}
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

// export const Many: Story = {
//   render: () => {
//     const options = [
//       { id: 'option1', value: 'default', label: 'Default' },
//       { id: 'option2', value: 'test', label: 'Test' },
//       { id: 'option3', value: 'test2', label: 'Test2' }
//     ]
//     const [query, setQuery] = useState({
//       radio1: options[0].value,
//       radio2: options[0].value
//     })

//     const handleValueChange = (id: string, value: string) => {
//       return setQuery((prev) => ({ ...prev, [`${id}`]: value }))
//     }

//     return (
//       <>
//         value: {query}
//         <RadioGroup
//           id="'radio1'"
//           defaultValue="default"
//           value={query.radio1}
//           onValueChange={handleValueChange}
//         >
//           {options.map((option) => (
//             <div key={option.id} className="flex items-center space-x-2">
//               <RadioGroupItem value={option.value} label={option.label} />
//             </div>
//           ))}
//         </RadioGroup>
//         <RadioGroup
//           id="radio2"
//           defaultValue="default"
//           value={query.radio2}
//           onValueChange={handleValueChange}
//         >
//           {options.map((option) => (
//             <div key={option.id} className="flex items-center space-x-2">
//               <RadioGroupItem value={option.value} label={option.label} />
//             </div>
//           ))}
//         </RadioGroup>
//       </>
//     )
//   }
// }
