import CreditIcon from '/public/icons/database.svg'
import Spinner from '/public/icons/loading-spinner.svg'

export const CreditAmountSkeleton = () => {
  return (
    <div className="mx-3 my-auto flex items-center gap-2">
      <CreditIcon className="stroke-white" />
      <span className="w-4 text-center text-[14px]">
        <div className="size-4">
          <Spinner
            className="animate-spin"
            width={16}
            height={16}
            fill="#AEAFB5"
          />
        </div>
      </span>
    </div>
  )
}
