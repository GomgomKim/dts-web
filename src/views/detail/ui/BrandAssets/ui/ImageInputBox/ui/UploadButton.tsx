import { Button } from '@/shared/ui/button'

export const UploadButton = ({ boxId }: { boxId: string }) => {
  return (
    <div>
      <div className="mb-3 text-center">
        <Button asChild variant="sub1" className="hover:bg-border">
          <label htmlFor={boxId} role="button">
            Upload
          </label>
        </Button>
      </div>
      <p className="text-neutral-5 whitespace-nowrap text-[0.875rem]">
        Supports JPG and PNG up to 10MB
      </p>
    </div>
  )
}
