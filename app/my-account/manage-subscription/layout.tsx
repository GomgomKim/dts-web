import type { Metadata } from 'next'

import { DefaultHeader } from '@/widgets/default-header'

export const metadata: Metadata = {
  title: 'Manage Subscription | My Account'
}

export default function ManageSubscriptionLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* TODO: header 수정 */}
      <DefaultHeader />
      <div className="h-screen pt-14">
        <main className="px-10 pt-5">{children}</main>
      </div>
    </>
  )
}
