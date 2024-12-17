import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { DrawingPanel } from './DrawingPanel'

const queryClient = new QueryClient()

const meta: Meta<typeof DrawingPanel> = {
  component: DrawingPanel,
  title: 'Widgets/editor-panel/DrawingPanel',
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
}
export default meta

type Story = StoryObj<typeof DrawingPanel>

export const Default: Story = {
  render: () => <DrawingPanel title="Select Area" panelId="select-area" />
}
