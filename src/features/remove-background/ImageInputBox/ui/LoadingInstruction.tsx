import SpinnerIcon from '/public/icons/loading-spinner.svg'

export const LoadingInstruction = () => {
  return (
    <div>
      <div className="m-auto mb-2 size-4">
        <SpinnerIcon
          className="animate-spin"
          width="16"
          height="16"
          fill="#AEAFB5"
        />
      </div>
      <p className="text-nowrap text-[0.875rem] text-neutral-7 2xl:text-[1.25rem]">
        Tweaking the background...
      </p>
    </div>
  )
}
