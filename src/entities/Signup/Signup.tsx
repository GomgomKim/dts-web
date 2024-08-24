'use client'

import Link from 'next/link'
import DTSLogo from '/public/icons/dts-logo.svg'
import { Button } from '@/shared/ui'
import GoogleIcon from '/public/icons/google-logo.svg'
import { useRouter } from 'next/navigation'

const SignupButton = () => {
  return (
    <Button className="bg-white relative text-[14px]">
      <span className="absolute left-[20px]">
        <GoogleIcon />
      </span>
      Sign up with Google
    </Button>
  )
}

type SignupProps = {
  modalRef?: React.RefObject<HTMLDivElement>
}

const Signup = ({ modalRef }: SignupProps) => {
  const router = useRouter()

  return (
    <div className="w-screen h-full flex justify-center absolute bg-neutral-0-90 inset-0 z-50">
      <div
        ref={modalRef}
        className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative p-10 w-[400px] bg-background"
      >
        <div>
          <button onClick={() => router.back()}>
            <DTSLogo />
          </button>
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
            <SignupButton />
          </div>
        </div>
        <div>
          <div className="w-full border border-neutral-2 my-3"></div>
          <div className="my-6 text-neutral-5 text-[12px] leading-[20px]">
            By clicking “Sign up with Google” you agree to our{' '}
            <span className="text-white text-nowrap">Terms of Use</span> and
            acknowledge that you have read and understand our{' '}
            <span className="text-white text-nowrap">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Signup }
