import DashedSvg from '/public/icons/dashed.svg'

import { v4 } from 'uuid'

interface VariationEmptyProps {
  length: number
}

export const VariationEmpty = (props: VariationEmptyProps) => {
  return (
    <>
      {Array.from({
        length: props.length
      }).map((_, index) => (
        <div
          key={index + v4()}
          className="relative aspect-[206/219] w-full overflow-hidden rounded-[0.5rem] bg-neutral-1 bg-opacity-50"
        >
          <DashedSvg className="absolute inset-0 size-full" />
        </div>
      ))}
    </>
  )
}
