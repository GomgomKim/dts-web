import { Button } from '@/shared/ui/button'

export const UploadButton = ({ boxId }: { boxId: string }) => {
  return (
    <div>
      <div className="mb-3 text-center">
        <Button
          asChild
          variant="sub1"
          className="hover:bg-border group-focus-within:ring-2 group-focus-within:ring-ring"
        >
          <label
            htmlFor={boxId}
            role="button"
            className="min-[3840px]:text-[1.25rem]"
          >
            Upload
          </label>
        </Button>
      </div>
      <p className="text-neutral-5 whitespace-nowrap text-[0.875rem] min-[3840px]:text-[1.25rem]">
        Supports JPG and PNG up to 10MB
      </p>
    </div>
  )
}
