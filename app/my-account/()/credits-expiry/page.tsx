import type { Metadata } from 'next'

import CreditsExpiry from '@/views/my-account-credits-expiry'

export const metadata: Metadata = {
  title: 'Credits Expiry'
}
export default function CreditsExpiryPage() {
  return <CreditsExpiry />
}
