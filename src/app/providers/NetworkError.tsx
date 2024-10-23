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
    <div className="z-[100] bg-background fixed inset-0">
      <div className="absolute-center flex flex-col sm:flex-row sm:items-center">
        <h1 className="text-[3rem] font-bold mr-8 mb-4 sm:mb-0 text-nowrap">
          Network Error
        </h1>
        <div className="sm:pl-16 relative sm:before:content-[''] sm:before:absolute sm:before:left-0 sm:before:h-full sm:before:w-[1px] sm:before:mx-4 sm:before:bg-neutral-2">
          <p className="sm:text-[1.5rem] text-[1.125rem]">Unable to Connect</p>
          <p className="sm:text-[1.125rem] text-[0.875rem] text-neutral-5 text-nowrap">
            Sorry, we can&#039;t connect right now. Please try again.
          </p>
          <Button
            onClick={() => router.refresh()}
            className="rounded-[0.5rem] bg-white mt-5 hover:bg-white"
          >
            <RotateIcon className="stroke-black mr-[10px]" />
            <p className="font-semibold text-[0.75rem]">Try Again</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
