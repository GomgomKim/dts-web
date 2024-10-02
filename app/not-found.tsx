import Link from 'next/link'

import { Button } from '@/shared/ui'

import ArrowLeft from '/public/icons/arrow-thin.svg'

export default function NotFound() {
  return (
    <div className="absolute-center flex flex-col not-mobile:flex-row not-mobile:items-center">
      <h1 className="text-[3rem] font-bold mr-8 mb-4 not-mobile:mb-0">404</h1>
      <div className="not-mobile:pl-16 relative not-mobile:before:content-[''] not-mobile:before:absolute not-mobile:before:left-0 not-mobile:before:h-full not-mobile:before:w-[1px] not-mobile:before:mx-4 not-mobile:before:bg-neutral-2">
        <p className="not-mobile:text-[1.5rem] text-[1.125rem]">
          Page not found
        </p>
        <p className="not-mobile:text-[1.125rem] text-[0.875rem] text-neutral-5 text-nowrap">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button asChild className="rounded-[0.5rem] bg-white mt-5">
          <Link href="/explore">
            <ArrowLeft className="stroke-black -rotate-[135deg] mr-[10px]" />
            <p className="font-semibold text-[0.75rem]">Go back to home</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}
