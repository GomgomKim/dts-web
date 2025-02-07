'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/ui'

import DTSLogo from '/public/icons/dts-logo.svg'

import { UI_TEXT } from './constants'
import { GoogleButton } from './ui/google-button'

interface LoginProps {
  modalRef?: React.RefObject<HTMLDivElement>
}

export default function Login(props: LoginProps) {
  const searchParams = useSearchParams()

  const modelName = searchParams.get('name')
  const modelId = searchParams.get('id')

  const redirectPageInfo =
    modelName && modelId ? `name=${modelName}&id=${modelId}` : ''

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-neutral-0-90">
      <div
        ref={props.modalRef}
        className="relative m-auto mx-2 flex w-[400px] flex-col gap-8 rounded-[12px] border border-neutral-2 bg-background p-10"
      >
        <div className="mb-2">
          <Link href="/">
            <DTSLogo />
          </Link>
        </div>
        <div>
          <div className="mb-3 text-[24px] font-semibold">
            {UI_TEXT.GET_STARTED}
          </div>
          <p className="text-[14px] font-medium text-neutral-7">
            {UI_TEXT.LOG_IN_DESCRIPTION}
          </p>
        </div>
        <div>
          <GoogleButton redirectPageInfo={redirectPageInfo} />
          <div className="mt-3 text-center">
            <Button
              variant="link"
              size="small"
              className="text-white underline underline-offset-[3px]"
              asChild
            >
              <Link href="https://tally.so/r/314QEg" target="_blank">
                {UI_TEXT.FEEDBACK}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
