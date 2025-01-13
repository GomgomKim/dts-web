import { ComponentProps } from 'react'

import Image from 'next/image'

import { URL_BASE_IMAGE_FILE } from '@/shared/api/constants'
import { Asset } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/ui/checkbox'

import { DummyData } from '../../model/types'
import { EyeContactsName } from './ui/EyeContactsName'

interface RecentItemProps<T> extends ComponentProps<'div'> {
  item: T
  isSelected: boolean
  onClickCheckbox: () => void
}

export const RecentItem = <T extends DummyData | Asset>(
  props: RecentItemProps<T>
) => {
  const isDummyData = 'src' in props.item

  let src = ''
  if (!isDummyData) {
    src =
      process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
        ? (props.item as Asset).encryptedAssetUrl
        : process.env.NEXT_PUBLIC_API_URL +
          URL_BASE_IMAGE_FILE +
          encodeURIComponent((props.item as Asset).encryptedAssetUrl)
  }

  return (
    <div
      className={cn(
        'relative flex aspect-square items-center justify-center rounded-[0.5rem] bg-neutral-2/50 p-3 pb-0 pr-4',
        props.className
      )}
    >
      <Checkbox
        className="absolute left-2 top-2 z-10"
        checked={props.isSelected}
        onCheckedChange={props.onClickCheckbox}
      />
      <div className="flex flex-col gap-3">
        <Image
          src={isDummyData ? (props.item as DummyData).src : src}
          alt={
            isDummyData && (props.item as DummyData).name
              ? (props.item as DummyData).name!
              : ''
          }
          width={96}
          height={96}
          className="aspect-square object-contain"
        />
        {/* TODO: api 이름 속성 필요 */}
        {(props.item as DummyData).name ? (
          <EyeContactsName name={(props.item as DummyData).name!} />
        ) : null}
      </div>
    </div>
  )
}
