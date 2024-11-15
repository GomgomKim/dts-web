'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { GoogleButton } from '@/shared/ui/GoogleButton/GoogleButton'

import DTSLogo from '/public/icons/dts-logo.svg'

interface LoginProps {
  modalRef?: React.RefObject<HTMLDivElement>
}

export const Login = (props: LoginProps) => {
  const searchParams = useSearchParams()

  const modelName = searchParams.get('name')
  const modelId = searchParams.get('id')

  const redirectPageInfo =
    modelName && modelId ? `name=${modelName}&id=${modelId}` : ''

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-neutral-0-90">
      <div
        ref={props.modalRef}
        className="relative m-auto mx-2 flex w-[400px] flex-col gap-10 rounded-[12px] border border-neutral-2 bg-background p-10"
      >
        <div>
          <Link href="/">
            <DTSLogo />
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <div className="text-[24px]">Welcome Back</div>
            <div className="mt-3 flex gap-2">
              <p className="text-[14px] text-neutral-7">
                Don’t have an account?
              </p>
              <Link
                replace
                href={`/signup?${redirectPageInfo}`}
                className="text-[14px] text-primary"
              >
                Sign up for free
              </Link>
            </div>
          </div>
          <GoogleButton redirectPageInfo={redirectPageInfo}>
            Log in with google
          </GoogleButton>
        </div>
      </div>
    </div>
  )
}
