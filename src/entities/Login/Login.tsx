'use client'

import Link from 'next/link'
import DTSLogo from '/public/icons/dts-logo.svg'
import { Button } from '@/shared/ui'
import GoogleIcon from '/public/icons/google-logo.svg'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
  return (
    <Button className="bg-white relative text-[14px]">
      <span className="absolute left-[20px]">
        <GoogleIcon />
      </span>
      Log in with Google
    </Button>
  )
}

type LoginProps = {
  modalRef?: React.RefObject<HTMLDivElement>
}

const Login = ({ modalRef }: LoginProps) => {
  const router = useRouter()

  return (
    <div className="w-screen h-full flex justify-center absolute bg-neutral-0-90 inset-0 z-50">
      <div
        ref={modalRef}
        className="flex flex-col gap-10 border border-neutral-2 rounded-[12px] m-auto relative w-[400px] p-10 bg-background"
      >
        <div>
          <button onClick={() => router.back()}>
            <DTSLogo />
          </button>
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
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

export { Login }
