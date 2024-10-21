import Link from 'next/link'

import { useAuthStore } from '@/entities/UserProfile/store'

import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { Button } from '@/shared/ui'
import { Portal } from '@/shared/ui/Portal/Portal'

import ArrowLeft from '/public/icons/arrow-thin.svg'
import DTSLogo from '/public/icons/dts-logo.svg'

import { useQueryClient } from '@tanstack/react-query'

export const AuthErrorModal = () => {
  const queryClient = useQueryClient()
  const logOut = useAuthStore((state) => state.logOut)

  usePreventScroll()

  return (
    <Portal>
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
                An error occurred while processing your request. Return to the
                homepage to log in again.
              </p>
            </div>

            <Button
              variant="destructive"
              className="py-[1rem]"
              stretch
              onClick={() => {
                logOut(queryClient)
              }}
            >
              <div className="flex items-center gap-[0.5rem]">
                <ArrowLeft className="stroke-black -rotate-[135deg]" />
                <span className="text-[0.75rem] font-semibold">
                  Go Back Home to Log In
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
    </Portal>
  )
}
