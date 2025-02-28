import { ComponentProps } from 'react'

import Link from 'next/link'

import { Button } from '@/shared/ui'

import LockIcon from '/public/icons/lock.svg'

import { PrivateButton } from '../PrivateButton'
import { UI_TEXT } from '../model/constants'

type PrivateButtonProps = ComponentProps<typeof PrivateButton>

interface GetAccessButtonProps extends PrivateButtonProps {}

export const GetAccessButton = (props: GetAccessButtonProps) => {
  return (
    <Button asChild variant="outline" size="small" {...props}>
      <Link href="/pricing">
        <LockIcon className="mr-2 stroke-white" />
        {UI_TEXT.GET_ACCESS}
      </Link>
    </Button>
  )
}
