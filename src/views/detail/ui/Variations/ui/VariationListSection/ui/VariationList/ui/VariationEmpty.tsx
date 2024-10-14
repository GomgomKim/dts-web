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
          className="relative rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden"
        >
          <DashedSvg className="w-full h-full absolute inset-0" />
        </div>
      ))}
    </>
  )
}
