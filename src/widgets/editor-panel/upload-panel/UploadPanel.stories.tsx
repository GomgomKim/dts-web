import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { UploadPanel } from './UploadPanel'

const queryClient = new QueryClient()

const meta: Meta<typeof UploadPanel> = {
  component: UploadPanel,
  title: 'Widgets/editor-panel/UploadPanel',
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

type Story = StoryObj<typeof UploadPanel>

export const Default: Story = {
  render: () => (
    <UploadPanel
      title="Cream Texture"
      panelId="cream-texture"
      isRecentItemsShow={false}
      toggleRecentItemsShow={() => {}}
      recentItems={<></>}
      transparency={<></>}
    />
  )
}
