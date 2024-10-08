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
      className="absolute top-[1rem] right-[1rem] group"
    >
      <DeleteIcon className="stroke-current group-hover:stroke-white" />
    </Button>
  )
}
