import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { EditorPanel } from './EditorPanel'

const meta: Meta<typeof EditorPanel> = {
  component: EditorPanel,
  title: 'shared/EditorPanel',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof EditorPanel>

export const Default: Story = {
  render: () => {
    return (
      <EditorPanel title="Skin Glow">
        <div className="flex gap-3">
          <Button variant="ghost">Glow 1</Button>
          <Button variant="ghost">Glow 2</Button>
        </div>
      </EditorPanel>
    )
  }
}
