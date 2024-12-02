import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorites'
}

export default function FavoritesLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="pr-5 pt-3 md:px-12">{children}</main>
}
