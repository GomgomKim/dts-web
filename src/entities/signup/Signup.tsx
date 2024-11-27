'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { track } from '@/shared/lib/utils/mixpanel'
import { Button } from '@/shared/ui'
import { GoogleButton } from '@/shared/ui/google-button'

import DTSLogo from '/public/icons/dts-logo.svg'

interface SignupProps {
  modalRef?: React.RefObject<HTMLDivElement>
}

export const Signup = (props: SignupProps) => {
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
        <div>
          <div className="flex flex-col gap-8">
            <div>
              <div className="text-[24px]">Create an account</div>
              <div className="mt-3 flex gap-2">
                <p className="text-[14px] text-neutral-7">
                  Already have an account?
                </p>
                <Link
                  replace
                  href={`/login?${redirectPageInfo}`}
                  className="text-[14px] text-primary"
                >
                  Log in
                </Link>
              </div>
            </div>
            <GoogleButton
              redirectPageInfo={redirectPageInfo}
              onClick={() => {
                track.sendToMixpanel('click_signup')
              }}
            >
              Sign up with google
            </GoogleButton>
          </div>
        </div>
        <div>
          <div className="my-3 w-full border border-neutral-2"></div>
          <div className="my-6 text-[12px] leading-[20px] text-neutral-5">
            By clicking “Sign up with Google” you agree to our{' '}
            <Button
              asChild
              variant="link"
              className="p-0 text-[12px] text-white"
            >
              <Link
                href="https://www.notion.so/ec82e5e0bba54f4b8a4ca2229eb16a22?pvs=4"
                target="_blank"
              >
                Terms of Use
              </Link>
            </Button>{' '}
            and acknowledge that you have read and understand our{' '}
            <Button
              asChild
              variant="link"
              className="text-nowrap p-0 text-[12px] text-white"
            >
              <Link
                href="https://www.notion.so/2b06e9bc71ab4d26bdcdd9cec7c8edae?pvs=4"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
