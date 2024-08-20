type Props = {
  progress: number
}
export const ProgressInfo = (props: Props) => {
  return (
    <div className="absolute top-[12px] right-[12px] rounded-[4px] p-2 bg-neutral-0-50 text-[12px]">
      Realtime: <span className="text-primary">{props.progress}%</span>
    </div>
  )
}
