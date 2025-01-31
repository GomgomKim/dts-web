import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Models'
}

export default function MyModelsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="pr-5 pt-3 lg:px-12">{children}</main>
}
