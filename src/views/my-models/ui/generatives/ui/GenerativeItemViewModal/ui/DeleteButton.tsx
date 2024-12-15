'use client'

import { Button } from '@/shared/ui'

import TrashIcon from '/public/icons/delete.svg'

export const DeleteButton = () => {
  // TODO: handle delete

  return (
    <Button variant="secondary" className="group size-8 bg-neutral-1 p-2">
      <TrashIcon className="stroke-neutral-7 group-hover:stroke-white" />
      <span className="a11y-hidden">Delete</span>
    </Button>
  )
}
