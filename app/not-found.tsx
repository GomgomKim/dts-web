import Link from 'next/link'

import { Button } from '@/shared/ui'

import ArrowLeft from '/public/icons/arrow-thin.svg'

export default function NotFound() {
  return (
    <div className="absolute-center flex flex-col sm:flex-row sm:items-center">
      <h1 className="mb-4 mr-8 text-[3rem] font-bold sm:mb-0">404</h1>
      <div className="relative sm:pl-16 sm:before:absolute sm:before:left-0 sm:before:mx-4 sm:before:h-full sm:before:w-px sm:before:bg-neutral-2 sm:before:content-['']">
        <p className="text-[1.125rem] sm:text-[1.5rem]">Page not found</p>
        <p className="text-nowrap text-[0.875rem] text-neutral-5 sm:text-[1.125rem]">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button
          asChild
          className="mt-5 rounded-[0.5rem] bg-white hover:bg-white"
        >
          <Link href="/explore">
            <ArrowLeft className="mr-[10px] rotate-[225deg] stroke-black" />
            <p className="text-[0.75rem] font-semibold">Go back to home</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}
