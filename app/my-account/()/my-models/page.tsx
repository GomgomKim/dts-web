import { Metadata } from 'next/types'

import MyAccountMyModels from '@/views/my-account-my-models'

export const metadata: Metadata = {
  title: 'My Models'
}

export default function MyAccountMyModelsPage() {
  return <MyAccountMyModels />
}
