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
    <div className="flex justify-center fixed bg-neutral-0-90 inset-0 z-50">
      <div
        ref={props.modalRef}
        className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative w-[400px] p-10 bg-background mx-2"
      >
        <div>
          <Link href="/">
            <DTSLogo />
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <div className="text-[24px]">Welcome Back</div>
            <div className="flex mt-3 gap-[0.5rem]">
              <p className="text-neutral-7 text-[14px]">
                Don’t have an account?
              </p>
              <Link
                replace
                href={`/signup?${redirectPageInfo}`}
                className="text-primary text-[14px]"
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
