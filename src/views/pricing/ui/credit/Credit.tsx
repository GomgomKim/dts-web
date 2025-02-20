import { useState } from 'react'

import { AddCreditsContinueButton } from '@/features/add-credits/ui'
import { AddCreditsForm } from '@/features/add-credits/ui/AddCreditsForm'

export const Credit = () => {
  const [isSelectedCredit, setIsSelectedCredit] = useState<boolean>(false)

  return (
    <div className="m-auto w-[30rem]">
      <AddCreditsForm
        toggleIsSelectedCredit={(value: boolean) => setIsSelectedCredit(value)}
      />
      <AddCreditsContinueButton
        className="mt-8 bg-white hover:bg-white"
        isSelectedCredit={isSelectedCredit}
      />
    </div>
  )
}
