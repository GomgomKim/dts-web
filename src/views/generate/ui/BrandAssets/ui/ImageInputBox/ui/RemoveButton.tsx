import { Button } from '@/shared/ui'

import DeleteIcon from '/public/icons/delete.svg'

export const RemoveButton = ({
  onClickRemoveButton
}: {
  onClickRemoveButton: () => void
}) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClickRemoveButton}
      className="group/btn absolute right-4 top-4"
    >
      <DeleteIcon className="stroke-current group-hover/btn:stroke-white" />
    </Button>
  )
}
