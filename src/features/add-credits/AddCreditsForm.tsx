import { FormEventHandler, useState } from 'react'

import { AgreementCheckbox } from '@/views/pricing/ui/modals/ui'

import { Checkbox } from '@/shared/ui/checkbox'

import { CREDITS_OPTIONS } from './model/constants'
import { Credit, CreditOption, PostPurchaseCreditRequest } from './model/types'

type PostPurchaseCreditFormValues = PostPurchaseCreditRequest

interface AddCreditsFormProps {
  toggleIsSelectedCredit: (value: boolean) => void
}

export const AddCreditsForm = (props: AddCreditsFormProps) => {
  const [agreeToPricingPolicy, setAgreeToPricingPolicy] = useState<{
    isChecked: boolean
    isShowError: boolean
  }>({
    isChecked: false,
    isShowError: false
  })
  const [checkedCredit, setCheckedCredit] = useState<{
    isChecked: boolean
    checkedItemId: CreditOption['id'] | null
  }>({
    isChecked: false,
    checkedItemId: null
  })

  const handleChangeCheckbox: (
    id: CreditOption['id']
  ) => (checked: boolean) => void = (id) => (checked) => {
    if (!checked) {
      setCheckedCredit(() => ({ isChecked: false, checkedItemId: null }))
      props.toggleIsSelectedCredit(false)
      return
    }
    setCheckedCredit(() => ({ isChecked: checked, checkedItemId: id }))
    props.toggleIsSelectedCredit(checked)
  }

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()

    // 동의 체크박스 확인
    if (agreeToPricingPolicy.isChecked === false) {
      setAgreeToPricingPolicy((prev) => ({
        ...prev,
        isShowError: true
      }))
      return
    }

    const postPurchaseCreditFormValues: PostPurchaseCreditFormValues = {
      credit: checkedCredit.checkedItemId as Credit,
      isAgreeToPricingPolicy: agreeToPricingPolicy.isChecked
    }

    // TODO: form 제출
    alert(JSON.stringify(postPurchaseCreditFormValues))
  }

  return (
    <>
      <form id="add-credits-form" className="space-y-3" onSubmit={handleSubmit}>
        {CREDITS_OPTIONS.map(({ id, label, value }) => (
          <div
            key={id}
            className="flex justify-between rounded-[0.5rem] bg-neutral-1 p-5"
          >
            <label className="flex cursor-pointer items-center " htmlFor={id}>
              <Checkbox
                id={id}
                name="credit_option"
                className="mr-2"
                checked={
                  checkedCredit.isChecked && checkedCredit.checkedItemId === id
                }
                onCheckedChange={handleChangeCheckbox(id)}
              />
              <span className="text-[1.125rem] font-medium">{label}</span>
            </label>
            <span className="text-[1.125rem] text-neutral-7">${value}</span>
          </div>
        ))}
      </form>
      <AgreementCheckbox
        isChecked={agreeToPricingPolicy.isChecked}
        isShowError={agreeToPricingPolicy.isShowError}
        onChange={() => {
          if (!agreeToPricingPolicy.isChecked) {
            setAgreeToPricingPolicy((prev) => ({
              ...prev,
              isShowError: false
            }))
          }
          setAgreeToPricingPolicy((prev) => ({
            ...prev,
            isChecked: !prev.isChecked
          }))
        }}
      />
    </>
  )
}
