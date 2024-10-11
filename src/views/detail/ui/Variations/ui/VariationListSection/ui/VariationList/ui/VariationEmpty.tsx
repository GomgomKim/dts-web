import DashedSvg from '/public/icons/dashed.svg'

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
          key={index}
          className="rounded-[0.5rem] aspect-[206/219] w-full bg-neutral-1 bg-opacity-50 overflow-hidden"
        >
          <DashedSvg />
        </div>
      ))}
    </>
  )
}
