import { FormEventHandler, useState } from 'react'

import { useRouter } from 'next/navigation'

import { PostSignUpRequest } from '@/views/oauth2-callback/model/types'

import { Button } from '@/shared/ui'
import { Checkbox } from '@/shared/ui/checkbox'

import LogoIcon from '/public/icons/dts-logo.svg'

import {
  PostSignUpAgreeReqParams,
  PostSignUpOAuthReqParams
} from './model/types'

export type PostSignUpFormValues = PostSignUpOAuthReqParams &
  PostSignUpAgreeReqParams

type PostSignUpReqKeys = keyof PostSignUpRequest

type SignUpReqCheckKeys = Extract<
  PostSignUpReqKeys,
  'agreeTermsVer' | 'agreePrivacyTermsVer' | 'agreeMarketingTermsVer'
>

type ChecksState = {
  [key in SignUpReqCheckKeys]-?: boolean
}

const POST_SIGN_UP_CHECKS: { name: SignUpReqCheckKeys; label: string }[] = [
  { name: 'agreeTermsVer', label: 'I agree to the Terms of Use.' },
  {
    name: 'agreePrivacyTermsVer',
    label: 'I have read the Privacy Policy.'
  },
  {
    name: 'agreeMarketingTermsVer',
    label: 'I agree to receive marketing information.\n(Optional)'
  }
]

interface SignUpFormProps {
  onSubmit: (formValues: PostSignUpFormValues) => void
  postSignUpOAuthReqParams: PostSignUpOAuthReqParams
  isSignUpPending: boolean
}

export default function SignUpForm(props: SignUpFormProps) {
  const router = useRouter()
  const [postSignUpChecks, setPostSignUpChecks] = useState<ChecksState>({
    agreePrivacyTermsVer: false,
    agreeTermsVer: false,
    agreeMarketingTermsVer: false
  })

  const handleChangeCheckbox: (
    name: keyof ChecksState
  ) => (checked: boolean) => void = (name) => (checked) => {
    setPostSignUpChecks((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()

    const postSignUpFormValues: PostSignUpFormValues = {
      ...postSignUpChecks,
      ...props.postSignUpOAuthReqParams,
      agreePrivacyTermsVer: '1.0.0',
      agreeTermsVer: '1.0.0',
      agreeMarketingTermsVer: postSignUpChecks.agreeMarketingTermsVer
        ? '1.0.0'
        : undefined
    }

    props.onSubmit(postSignUpFormValues)
  }

  const isCheckComplete =
    postSignUpChecks.agreeTermsVer && postSignUpChecks.agreePrivacyTermsVer
  const disabled = !isCheckComplete || props.isSignUpPending

  return (
    <form className="w-[400px] p-10" onSubmit={handleSubmit}>
      <div className="select-none">
        <div className="mb-10 size-8">
          <LogoIcon />
        </div>
        <h2 className="mb-3 text-[24px] font-semibold text-white">
          Terms & Privacy
        </h2>
        <p className="mb-8 text-[14px] text-[#aeafb5]">
          To create an account,
          <br />
          please review and agree to the following:
        </p>
      </div>
      <div className="mb-8 flex flex-col gap-3">
        {POST_SIGN_UP_CHECKS.map(({ name, label }) => (
          <div key={name} className="pt-2">
            <label
              className="flex cursor-pointer select-none items-center"
              htmlFor={name}
            >
              <Checkbox
                id={name}
                name={name}
                className="mr-2"
                checked={postSignUpChecks[name]}
                onCheckedChange={handleChangeCheckbox(name)}
              />
              <span className="text-[14px] text-[#aeafb5]">{label}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="mb-3 h-12">
        <Button
          type="submit"
          className="w-full font-semibold"
          variant="primary"
          disabled={disabled}
        >
          Confirm
        </Button>
      </div>
      <div className="h-12">
        <Button
          type="button"
          className="w-full"
          variant="link"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
