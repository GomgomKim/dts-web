'use client'

import Link from 'next/link'

import { Button } from '@/shared/ui'

import AlertIcon from '/public/icons/alert-circle.svg'
import DTSLogo from '/public/icons/dts-logo.svg'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)

  return (
    <html>
      <body>
        <div className="flex justify-center fixed bg-neutral-0-90 inset-0 z-50">
          <div className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative w-[400px] p-10 bg-background mx-2">
            <div className="mr-auto">
              <Link href="/">
                <DTSLogo />
              </Link>
            </div>

            <div>
              <div className="mb-[2rem]">
                <div className="text-[24px] mb-3">Service Unavailable</div>
                <p className="text-neutral-7 text-[14px]">
                  An error occurred while processing your request. Please
                  refresh the page to try again.
                </p>
              </div>

              <Button
                variant="destructive"
                className="py-[1rem]"
                stretch
                onClick={() => {
                  //   logOut(queryClient)
                  reset()
                }}
              >
                <div className="flex items-center gap-[0.5rem]">
                  <AlertIcon className="stroke-black -rotate-[135deg]" />
                  <span className="text-[0.875rem] font-semibold">
                    Try Again
                  </span>
                </div>
              </Button>

              <div className="mt-3 text-center">
                <Link
                  href="https://tally.so/r/314QEg"
                  target="_blank"
                  className="text-[14px] underline underline-offset-4 p-3 inline-block text-center"
                >
                  Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
