'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAuthStore } from '@/entities/UserProfile/store'

import DTSLogo from '/public/icons/dts-logo.svg'

import { ExploreBackButton } from './ui/ExploreBackButton'
import { ExternalLinks } from './ui/ExternalLinks'
import { LoginSignupButtons } from './ui/LoginSignupButtons'
import { UserProfileSummary } from './ui/UserProfileSummary'

export const Header = () => {
  const pathname = usePathname()
  const isAuth = useAuthStore((state) => state.isAuth)

  const isDetailPage = pathname.startsWith('/archive/')
  const isMainPage =
    pathname.startsWith('/explore') || pathname.startsWith('/favorites')

  return (
    <header className="fixed top-0 inset-0 z-40 h-14 py-[7.5px] px-5 bg-background">
      <div className="flex items-center gap-[0.5rem]">
        <Link href="/explore?filterType=ALL" className="mr-5">
          <DTSLogo />
        </Link>

        {isDetailPage ? <ExploreBackButton /> : null}
        <div className="flex items-center ml-auto">
          <nav className=" text-[14px] text-secondary-foreground flex items-center">
            <ul className="flex items-center">
              {isMainPage ? <ExternalLinks /> : null}
              {isAuth !== true ? <LoginSignupButtons /> : null}
            </ul>
          </nav>
          {isAuth === true ? <UserProfileSummary /> : null}
        </div>
      </div>
    </header>
  )
}
