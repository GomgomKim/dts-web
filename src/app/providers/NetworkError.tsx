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
      <div className="absolute-center flex flex-col md:flex-row md:items-center">
        <h1 className="text-[3rem] font-bold mr-8 mb-4 md:mb-0 text-nowrap">
          Network Error
        </h1>
        <div className="md:pl-16 relative md:before:content-[''] md:before:absolute md:before:left-0 md:before:h-full md:before:w-[1px] md:before:mx-4 md:before:bg-neutral-2">
          <p className="md:text-[1.5rem] text-[1.125rem]">Unable to Connect</p>
          <p className="md:text-[1.125rem] text-[0.875rem] text-neutral-5 text-nowrap">
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
