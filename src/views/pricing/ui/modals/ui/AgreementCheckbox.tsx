import Link from 'next/link'

import { Checkbox } from '@/shared/ui/checkbox'

import { UI_TEXT } from '../constants'

interface AgreementCheckboxProps {
  isChecked: boolean
  isShowError: boolean
  onChange: () => void
}

export const AgreementCheckbox = (props: AgreementCheckboxProps) => {
  return (
    <div className="relative">
      <div className="mt-5 flex items-center pb-2">
        <Checkbox checked={props.isChecked} onCheckedChange={props.onChange} />
        <span className="ml-2 text-neutral-7">
          {UI_TEXT.AGREEMENT_TEXT_1}
          <Link
            href="#"
            className="text-white underline underline-offset-2 [text-decoration-skip-ink:none] "
          >
            {UI_TEXT.AGREEMENT_TEXT_2}
          </Link>
          .
        </span>
      </div>
      {props.isShowError && (
        <p className="absolute bottom-[-15px] ml-8 text-destructive">
          {UI_TEXT.AGREEMENT_REQUIRED_ERROR}
        </p>
      )}
    </div>
  )
}
