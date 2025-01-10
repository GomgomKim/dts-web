import type { Metadata } from 'next'

import { DefaultHeader } from '@/widgets/default-header'

export const metadata: Metadata = {
  title: 'Pricing'
}

export default function PricingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DefaultHeader />
      <div className="pt-14">{children}</div>
    </>
  )
}
