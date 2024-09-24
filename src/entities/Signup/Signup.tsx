import Link from 'next/link'

import { LoginButton } from '@/shared/ui/LoginButton/LoginButton'

import DTSLogo from '/public/icons/dts-logo.svg'

interface SignupProps {
  modalRef?: React.RefObject<HTMLDivElement>
}

export const Signup = ({ modalRef }: SignupProps) => {
  return (
    <div className="flex justify-center fixed bg-neutral-0-90 inset-0 z-50">
      <div
        ref={modalRef}
        className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative p-10 w-[400px] bg-background"
      >
        <div>
          <Link href="/explore?filterType=ALL">
            <DTSLogo />
          </Link>
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <div>
              <div className="text-[24px]">Create an account</div>
              <div className="flex mt-3 gap-[0.5rem]">
                <p className="text-neutral-7 text-[14px]">
                  Already have an account?
                </p>
                <Link href="/login" className="text-primary text-[14px]">
                  Log in
                </Link>
              </div>
            </div>
            <LoginButton>Sign up with google</LoginButton>
          </div>
        </div>
        <div>
          <div className="w-full border border-neutral-2 my-3"></div>
          <div className="my-6 text-neutral-5 text-[12px] leading-[20px]">
            By clicking “Sign up with Google” you agree to our{' '}
            <span className="text-white text-nowrap text-[12px]">
              Terms of Use
            </span>{' '}
            and acknowledge that you have read and understand our{' '}
            <span className="text-white text-nowrap text-[12px]">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
