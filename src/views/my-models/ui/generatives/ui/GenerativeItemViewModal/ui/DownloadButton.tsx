'use client'

import { Button } from '@/shared/ui'

import DownloadIcon from '/public/icons/download.svg'

export const DownloadButton = () => {
  return (
    <Button
      variant="secondary"
      className="group bg-neutral-1 p-2 pr-3 hover:bg-neutral-1 hover:text-white"
    >
      <DownloadIcon className="mr-2 stroke-neutral-7 group-hover:stroke-white" />
      Download
    </Button>
  )
}
