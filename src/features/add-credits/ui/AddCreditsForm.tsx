import { FormEventHandler, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useCurrencyStore } from '@/views/pricing/model/useCurrencyStore'
import { AgreementCheckbox } from '@/views/pricing/ui/modals/ui'

import { Checkbox } from '@/shared/ui/checkbox'

import {
  CREDIT_ITEMS,
  CREDIT_NAME_TITLE_MAP,
  UI_TEXT
} from '../model/constants'
import { Credit } from '../model/types'

interface AddCreditsFormProps {
  toggleIsSelectedCredit: (value: boolean) => void
}

export const AddCreditsForm = (props: AddCreditsFormProps) => {
  const router = useRouter()

  const [agreeToPricingPolicy, setAgreeToPricingPolicy] = useState<{
    isChecked: boolean
    isShowError: boolean
  }>({
    isChecked: false,
    isShowError: false
  })
  const [checkedCredit, setCheckedCredit] = useState<{
    isChecked: boolean
    checkedItemId: Credit['id'] | null
  }>({
    isChecked: false,
    checkedItemId: null
  })

  const currency = useCurrencyStore((state) => state.currency)
  const currencySign = useCurrencyStore((state) => state.getCurrencySign())

  const handleChangeCheckbox: (
    id: Credit['id']
  ) => (checked: boolean) => void = (id) => (checked) => {
    if (!checked) {
      setCheckedCredit(() => ({ isChecked: false, checkedItemId: null }))
      props.toggleIsSelectedCredit(false)
      return
    }
    setCheckedCredit(() => ({ isChecked: checked, checkedItemId: id }))
    props.toggleIsSelectedCredit(checked)
  }

  const handleClickContinue: FormEventHandler = async (e) => {
    e.preventDefault()

    // 동의 체크박스 확인
    if (agreeToPricingPolicy.isChecked === false) {
      setAgreeToPricingPolicy((prev) => ({
        ...prev,
        isShowError: true
      }))
      return
    }

    router.push(`/checkout?creditId=${checkedCredit.checkedItemId}`)
  }

  return (
    <>
      <form
        id="add-credits"
        className="space-y-3"
        onSubmit={handleClickContinue}
      >
        {CREDIT_ITEMS[currency].map(({ id, name, price }) => (
          <div
            key={id}
            className="flex justify-between rounded-[0.5rem] bg-neutral-1 p-5"
          >
            <label className="flex cursor-pointer items-center " htmlFor={name}>
              <Checkbox
                id={name}
                name="credit_option"
                className="mr-2"
                checked={
                  checkedCredit.isChecked && checkedCredit.checkedItemId === id
                }
                onCheckedChange={handleChangeCheckbox(id)}
              />
              <span className="text-[1.125rem] font-medium">
                {CREDIT_NAME_TITLE_MAP[name]} {UI_TEXT.CREDITS}
              </span>
            </label>
            <span className="text-[1.125rem] text-neutral-7">
              {currencySign}
              {price}
            </span>
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
