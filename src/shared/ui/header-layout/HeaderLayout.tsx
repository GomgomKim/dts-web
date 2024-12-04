import Link from 'next/link'

import DTSLogo from '/public/icons/dts-logo.svg'

interface HeaderLayoutProps {
  children: React.ReactNode
}
export const HeaderLayout = (props: HeaderLayoutProps) => {
  return (
    <header className="fixed inset-0 z-40 h-14 bg-background px-5 py-[7.5px]">
      <div className="flex items-center">
        <Link href="/explore?filterType=ALL" className="mr-5">
          <DTSLogo />
        </Link>

        {props.children}
      </div>
    </header>
  )
}
