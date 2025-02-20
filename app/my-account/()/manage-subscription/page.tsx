import { Metadata } from 'next/types'

import ManageSubscription from '@/views/manage-subscription'

export const metadata: Metadata = {
  title: 'Manage Subscription'
}

export default function ManageSubscriptionPage() {
  return <ManageSubscription />
}
