'use client'

import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import EyeOffIcon from '/public/icons/eye-off.svg'
import EyeOnIcon from '/public/icons/eye.svg'

export const ViewButton = () => {
  const [isViewingOriginal, setIsViewingOriginal] = useState(false)

  return (
    // TODO: variant 변경하기
    <Button
      variant="secondary"
      className={cn(
        'py-3 pl-3 pr-4 ',
        isViewingOriginal ? 'text-white' : 'text-neutral-5'
      )}
      onClick={() => setIsViewingOriginal((prev) => !prev)}
    >
      <>
        {isViewingOriginal ? <EyeOnIcon /> : <EyeOffIcon />}
        <span className="ml-3 text-[0.875rem]">View Original</span>
      </>
    </Button>
  )
}
