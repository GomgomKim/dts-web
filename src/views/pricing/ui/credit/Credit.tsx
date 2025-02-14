import { useState } from 'react'

import { AddCreditsForm } from '@/features/add-credits/AddCreditsForm'

import { Button } from '@/shared/ui'

export const Credit = () => {
  const [isSelectedCredit, setIsSelectedCredit] = useState<boolean>(false)

  return (
    <div className="m-auto w-[30rem]">
      <AddCreditsForm
        toggleIsSelectedCredit={(value: boolean) => setIsSelectedCredit(value)}
      />
      <Button
        className="mt-8 bg-white hover:bg-white"
        stretch
        type="submit"
        form="add-credits"
        disabled={!isSelectedCredit}
      >
        {isSelectedCredit ? 'Continue' : 'Select an amount'}
      </Button>
    </div>
  )
}
