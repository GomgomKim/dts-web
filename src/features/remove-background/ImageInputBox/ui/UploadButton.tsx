import { Button } from '@/shared/ui/button'

interface UploadButtonProps {
  disabled: boolean
  inputId: string
}

export const UploadButton = (props: UploadButtonProps) => {
  return (
    <div>
      <div className="mb-3 text-center">
        <Button
          asChild
          variant="sub1"
          disabled={props.disabled}
          className="group-focus-within:border-white group-focus-within:ring-2 group-focus-within:ring-ring"
        >
          <label
            htmlFor={props.inputId}
            role="button"
            className="2xl:text-[1.25rem]"
          >
            Upload
          </label>
        </Button>
      </div>
      <p className="whitespace-nowrap text-[0.875rem] text-neutral-5 2xl:text-[1.25rem]">
        Supports JPG and PNG up to 10MB
      </p>
    </div>
  )
}
