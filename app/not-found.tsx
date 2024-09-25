import Link from 'next/link'

import { Button } from '@/shared/ui'

import ArrowLeft from '/public/icons/arrow-thin.svg'

export default function NotFound() {
  return (
    <div className="absolute-center flex items-center">
      <h1 className="text-[3rem] font-bold mr-8">404</h1>
      <div className="pl-16 relative before:content-[''] before:absolute before:left-0 before:h-full before:w-[1px] before:mx-4 before:bg-neutral-2">
        <p className="text-[1.5rem]">Page not found</p>
        <p className="text-[1.125rem] text-neutral-5">
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
