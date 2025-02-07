import Link from 'next/link'

import { Button } from '@/shared/ui'

import { UI_TEXT } from '../model/constants'

export const SignInButton = () => {
  return (
    <li>
      <Button
        asChild
        className="ml-3 rounded-full text-[0.875rem]"
        size="small"
      >
        <Link href="/login" scroll={false}>
          {UI_TEXT.LOG_IN_OR_JOIN}
        </Link>
      </Button>
    </li>
  )
}
