import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'shared/Tabs',
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs className="bg-neutral-0">
      <TabsList>
        <TabsTrigger value="A">Tab A</TabsTrigger>
        <TabsTrigger value="B">Tab B</TabsTrigger>
      </TabsList>
      <TabsContent value="A">
        <div>AAAA</div>
        <div>AAAA</div>
        <div>AAAA</div>
      </TabsContent>
      <TabsContent value="B">
        <div>BBBB</div>
        <div>BBBB</div>
        <div>BBBB</div>
      </TabsContent>
    </Tabs>
  )
}
