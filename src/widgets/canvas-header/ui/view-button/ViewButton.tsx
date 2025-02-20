'use client'

import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import EyeOffIcon from '/public/icons/eye-off.svg'
import EyeOnIcon from '/public/icons/eye.svg'

import { UI_TEXT } from './model/constants'

export const ViewButton = () => {
  const globalVisibility = useLayerVisibilityStore(
    (state) => state.globalVisibility
  )
  const setGlobalVisibility = useLayerVisibilityStore(
    (state) => state.setGlobalVisibility
  )

  return (
    // TODO: variant 변경하기
    <Button
      variant="secondary"
      className={cn(
        'py-3 pl-3 pr-4 ',
        globalVisibility ? 'text-neutral-5' : 'text-white'
      )}
      onClick={() => setGlobalVisibility(!globalVisibility)}
    >
      <>
        {globalVisibility ? <EyeOffIcon /> : <EyeOnIcon />}
        <span className="ml-3 text-[0.875rem]">{UI_TEXT.VIEW_ORIGINAL}</span>
      </>
    </Button>
  )
}
