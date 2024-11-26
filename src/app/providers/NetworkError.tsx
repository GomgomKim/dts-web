'use client'

import { useRouter } from 'next/navigation'

import { useIsNetworkOffline } from '@/shared/lib/hooks/useNetwork'
import { usePreventScroll } from '@/shared/lib/hooks/usePreventScroll'
import { Button } from '@/shared/ui'

import RotateIcon from '/public/icons/rotate-cw.svg'

export function NetworkError({ children }: { children: React.ReactNode }) {
  const isNetworkOffLine = useIsNetworkOffline()

  return (
    <>
      {isNetworkOffLine === true ? <NetworkErrorPage /> : null}
      {children}
    </>
  )
}

const NetworkErrorPage = () => {
  const router = useRouter()
  usePreventScroll()
  return (
    <div className="fixed inset-0 z-[100] bg-background">
      <div className="absolute-center flex flex-col sm:flex-row sm:items-center">
        <h1 className="mb-4 mr-8 text-nowrap text-[3rem] font-bold sm:mb-0">
          Network Error
        </h1>
        <div className="relative sm:pl-16 sm:before:absolute sm:before:left-0 sm:before:mx-4 sm:before:h-full sm:before:w-px sm:before:bg-neutral-2 sm:before:content-['']">
          <p className="text-[1.125rem] sm:text-[1.5rem]">Unable to Connect</p>
          <p className="text-nowrap text-[0.875rem] text-neutral-5 sm:text-[1.125rem]">
            Sorry, we can&#039;t connect right now. Please try again.
          </p>
          <Button
            onClick={() => router.refresh()}
            className="mt-5 rounded-[0.5rem] bg-white hover:bg-white"
          >
            <RotateIcon className="mr-[10px] stroke-black" />
            <p className="text-[0.75rem] font-semibold">Try Again</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
