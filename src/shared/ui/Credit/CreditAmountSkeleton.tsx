import CreditIcon from '/public/icons/database.svg'
import Spinner from '/public/icons/loading-spinner.svg'

export const CreditAmountSkeleton = () => {
  return (
    <div className="flex gap-2 items-center mx-3 my-auto">
      <CreditIcon className="stroke-white" />
      <span className="text-[14px] w-4 text-center">
        <div className="w-4 h-4">
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
