import { ExportButton } from '@/entities/detail/ui/ExportButton'

type Props = {
  containerRef: React.RefObject<HTMLElement>
}

export const DownloadNowToast = (props: Props) => {
  return (
    <div className="z-30 absolute bottom-[20px] left-[50%] -translate-x-[50%]">
      <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
        <div className="mx-5 flex flex-col gap-1">
          <p className="text-[12px] text-nowrap font-[700]">
            Love what you see?
          </p>
          <p className="text-[12px] text-nowrap text-neutral-7">
            The magic might look different next time!
          </p>
        </div>
        <ExportButton
          containerRef={props.containerRef}
          className="ml-auto bg-white text-black font-[600] active:text-black hover:text-black"
        >
          Download it now
        </ExportButton>
      </div>
    </div>
  )
}
