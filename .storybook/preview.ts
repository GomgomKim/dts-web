import '@/app/styles/globals.css'

import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    nextjs: {
      // Ensure the app directory is set correctly
      appDirectory: true
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
