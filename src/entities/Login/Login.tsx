'use client'

import Link from 'next/link'
import DTSLogo from '/public/icons/dts-logo.svg'
import { Button } from '@/shared/ui'
import GoogleIcon from '/public/icons/google-logo.svg'
import { useRouter } from 'next/navigation'

// TODO:
const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=46244385145-oek5rc3ik17t7dfnsb55hvnu1va0ck98.apps.googleusercontent.com&redirect_uri=http://localhost:3000/explore?oAuthProviderType=GOOGLE&response_type=code&scope=email&access_type=offline&prompt=consent`

const LoginButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.replace(url)
  }

  return (
    <Button className="bg-white relative" onClick={handleClick}>
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
