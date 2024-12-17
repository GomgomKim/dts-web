import { useState } from 'react'

import Image, { StaticImageData } from 'next/image'

import { Button } from '@/shared/ui'
import { Checkbox } from '@/shared/ui/checkbox'

import DeleteIcon from '/public/icons/delete.svg'

import { EyeContactsName } from './ui/EyeContactsName'

interface RecentItemProps<T> {
  item: T
  isSelected: boolean
  onClick: () => void
}

export const RecentItem = <
  T extends { id: string; name: string; src: string | StaticImageData }
>(
  props: RecentItemProps<T>
) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="relative flex aspect-square items-center justify-center rounded-[0.5rem] bg-neutral-2/50 p-3 pb-0 pr-4"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Checkbox
        className="absolute left-2 top-2 z-10"
        checked={props.isSelected}
        onCheckedChange={props.onClick}
      />
      <div className="flex flex-col gap-3">
        <Image
          src={props.item.src}
          alt={props.item.name}
          width={96}
          height={96}
        />
        {/* TODO: eye-contacts만 해당되는데 외부 주입으로 변경할 수 있을지 */}
        <EyeContactsName name={props.item.name} isSelected={props.isSelected} />
      </div>
      {isHovering ? (
        <div className="absolute inset-0 flex items-end justify-center bg-custom-gradient p-4">
          <Button variant="outline" className="mb-5 px-3 py-2">
            <div className="flex items-center gap-[6px] *:text-[0.875rem]">
              <DeleteIcon stroke="#aeafb5" />
              <span>Delete</span>
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  )
}
