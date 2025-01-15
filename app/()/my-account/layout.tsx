import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account'
}

export default function MyAccountLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="pr-5 pt-3 md:px-12">{children}</main>
}
