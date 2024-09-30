import Link from 'next/link'

import DTSLogo from '/public/icons/dts-logo.svg'

import { HamburgerMenu } from './HamburgerMenu'

export const MobileHeader = () => {
  return (
    <header className="fixed top-0 inset-0 z-40 h-14 py-[7.5px] px-5 bg-background">
      <div className="flex items-center justify-between gap-[0.5rem]">
        <Link href="/mobile" className="mr-5">
          <DTSLogo />
        </Link>

        <HamburgerMenu />
      </div>
    </header>
  )
}
