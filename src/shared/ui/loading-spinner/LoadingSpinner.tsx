import Spinner from '/public/icons/loading-spinner.svg'

interface LoadingSpinnerProps {
  width: string
  height: string
}

export const LoadingSpinner = ({ width, height }: LoadingSpinnerProps) => {
  return (
    <div className={`absolute-center`}>
      <Spinner
        className="animate-spin"
        width={width}
        height={height}
        fill="#AEAFB5"
      />
    </div>
  )
}
