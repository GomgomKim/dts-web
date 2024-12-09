import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { MoreDropdownMenu } from './ui'

interface EditsCardItemProps {
  // TODO: StaticImageData 지우기
  src: string | StaticImageData
  alt: string
}

export const EditsCardItem = (props: EditsCardItemProps) => {
  return (
    <div className="overflow-hidden rounded-[0.5rem] bg-neutral-1">
      <Link
        href="#"
        // href={{ pathname: '/my-models', query: { id: 123 } }}
        className="relative block aspect-[269/200] overflow-hidden"
      >
        <Image
          src={props.src}
          alt="dummy"
          fill={true}
          className="object-cover"
        />
      </Link>
      <div className="flex items-center justify-between bg-neutral-1/50 p-4 hover:bg-neutral-1">
        {/* TODO: rename시 Input 창으로 변경 */}
        <p className="text-[0.875rem] leading-[17px]">untitled model</p>
        <MoreDropdownMenu />
      </div>
    </div>
  )
}
