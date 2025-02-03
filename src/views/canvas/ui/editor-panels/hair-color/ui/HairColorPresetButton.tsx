import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

export const HairColorPresetButton = ({
  selected,
  backgroundImage,
  handleClickButton,
  name
}: {
  selected: boolean
  backgroundImage: string
  handleClickButton: () => void
  name: string
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="sub"
        className={cn(
          'size-16 flex-col border-0 p-2.5',
          'bg-cover bg-center bg-no-repeat',
          selected ? 'border-[3px] border-white' : ''
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onClick={handleClickButton}
      />
      <span className="text-center text-[0.875rem] font-medium text-neutral-7">
        {name}
      </span>
    </div>
  )
}
