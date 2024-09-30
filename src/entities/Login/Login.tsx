import Link from 'next/link'

import { LoginButton } from '@/shared/ui/LoginButton/LoginButton'

import DTSLogo from '/public/icons/dts-logo.svg'

interface LoginProps {
  modalRef?: React.RefObject<HTMLDivElement>
}

export const Login = ({ modalRef }: LoginProps) => {
  return (
    <div className="flex justify-center fixed bg-neutral-0-90 inset-0 z-50">
      <div
        ref={modalRef}
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
              <Link href="/signup" className="text-primary text-[14px]">
                Sign up for free
              </Link>
            </div>
          </div>
          <LoginButton>Log in with google</LoginButton>
        </div>
      </div>
    </div>
  )
}
