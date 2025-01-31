import type { Metadata } from 'next'

import { DefaultHeader } from '@/widgets/default-header'

export const metadata: Metadata = {
  title: 'My Models | My Account'
}

export default function MyAccountMyModelsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* TODO: header 수정 */}
      <DefaultHeader />
      <div className="h-screen pt-14">
        <main className="px-10 pb-36 pt-5">{children}</main>
      </div>
    </>
  )
}
