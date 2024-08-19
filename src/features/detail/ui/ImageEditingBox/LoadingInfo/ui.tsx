import LoadingSpinner from '/public/icons/loading-spinner.svg'

export const LoadingInfo = () => {
  return (
    <div className="absolute-center bg-[rgba(32,33,36,0.90)] rounded-[8px] py-3 px-5">
      <div className="flex items-center gap-2">
        <div className="w-[1rem] h-[1rem] relative">
          <LoadingSpinner className="animate-spin" />
        </div>
        <p className="text-[12px] text-neutral-7">
          Hold on! Magic in progress...
        </p>
      </div>
    </div>
  )
}
