'use client'

import Link from 'next/link'
import DTSLogo from '/public/icons/dts-logo.svg'
import { Button } from '@/shared/ui'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Arrow from '/public/icons/arrow-thin.svg'
import { DownloadDropdown } from '@/shared/ui/dropdown-menu/download-dropdown'
import { ProfileDropdown } from '@/shared/ui/dropdown-menu/profile-dropdown'
import { useAuthStore } from '@/entities/user/store'
import { UserProfile } from '@/entities/user'

import { Suspense } from 'react'

const Links = () => {
  return (
    <>
      <li>
        <ProfileDropdown />
      </li>
      <li>
        <DownloadDropdown />
      </li>
      <li>
        <Button asChild variant="link">
          <Link href="https://medium.com/do-things-with-ai" target="_blank">
            Medium
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild variant="link">
          <Link
            href="https://www.instagram.com/dothings.studio/"
            target="_blank"
          >
            Instagram
          </Link>
        </Button>
      </li>
    </>
  )
}

const NotLoggedInNav = () => {
  return (
    <>
      <li>
        <Button asChild variant="link">
          <Link href="/login">Log in</Link>
        </Button>
      </li>
      <li>
        <Button asChild className="rounded-full">
          <Link href="/signup">Sign up</Link>
        </Button>
      </li>
    </>
  )
}

const UserInfo = () => {
  return (
    <div>
      <div>credit</div>
      <Suspense>
        <UserProfile />
      </Suspense>
    </div>
  )
}

const BackButton = () => {
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => router.back()} className="group">
      <div className="flex gap-[4px] items-center">
        <Arrow className="rotate-[-135deg] stroke-secondary-foreground group-hover:stroke-white" />
        <span>back to explore</span>
      </div>
    </Button>
  )
}

const Header = () => {
  const pathname = usePathname()
  const isAuth = useAuthStore((state) => state.isAuth)
  const isDetailPage = pathname.startsWith('/archive/')
  const isMainPage =
    pathname.startsWith('/explore') || pathname.startsWith('/favorites')

  return (
    <header className="fixed top-0 inset-0 z-40 h-14 py-[7.5px] px-5 bg-background">
      <div className="flex items-center gap-[0.5rem]">
        <span className="mr-5">
          <DTSLogo />
        </span>

        {isDetailPage ? <BackButton /> : null}
        <div className="flex items-center ml-auto">
          <nav className=" text-[14px] text-secondary-foreground flex items-center">
            <ul className="flex items-center">
              {isMainPage ? <Links /> : null}
              {isAuth ? null : <NotLoggedInNav />}
            </ul>
          </nav>
          {isAuth ? <UserInfo /> : null}
        </div>
      </div>
    </header>
  )
}

export { Header }
