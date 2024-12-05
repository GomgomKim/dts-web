import { useState } from 'react'

import { Button } from '@/shared/ui'
import { Checkbox } from '@/shared/ui/checkbox'

import DeleteIcon from '/public/icons/delete.svg'

export const RecentItem = () => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="relative flex aspect-square items-center justify-center rounded-[0.5rem] bg-neutral-2/50 p-3 pr-4"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Checkbox className="absolute left-2 top-2 z-10" />
      <div>image</div>
      {isHovering ? (
        <div className="absolute inset-0 flex items-end justify-center bg-custom-gradient p-4">
          {/* TODO: Button size 디자인시스템 속성으로 변경 */}
          <Button variant="outline" className="mb-5 px-3 py-2">
            <div className="flex items-center gap-[6px] *:text-[0.875rem]">
              {/* TODO: hover시 svg stoke 변경 */}
              <DeleteIcon stroke="#aeafb5" />
              <span>Delete</span>
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  )
}
