import Link from 'next/link'

import DTSLogo from '/public/icons/dts-logo.svg'

import { HamburgerMenu } from './ui'

export const MobileHeader = () => {
  return (
    <header className="fixed inset-0 z-40 h-14 bg-background px-5 py-[7.5px]">
      <div className="flex items-center justify-between gap-2">
        <Link href="/mobile" className="mr-5">
          <DTSLogo />
        </Link>

        <HamburgerMenu />
      </div>
    </header>
  )
}
