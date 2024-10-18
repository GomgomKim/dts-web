import SpinnerIcon from '/public/icons/loading-spinner.svg'

export const LoadingInstruction = () => {
  return (
    <div>
      <div className="w-4 h-4 m-auto mb-2">
        <SpinnerIcon
          className="animate-spin"
          width="16"
          height="16"
          fill="#AEAFB5"
        />
      </div>
      <p className="text-neutral-7 text-nowrap text-[0.875rem] min-[3840px]:text-[1.25rem]">
        Tweaking the background...
      </p>
    </div>
  )
}
