import Link from 'next/link'

import { Button } from '@/shared/ui'

import { UI_TEXT } from '../model/constants'

export const LoginSignupButtons = () => {
  return (
    <>
      <li>
        <Button asChild variant="link" size="small">
          <Link href="/login" scroll={false}>
            {UI_TEXT.LOG_IN}
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild className="rounded-full" size="small">
          <Link href="/signup" scroll={false}>
            {UI_TEXT.SIGN_UP}
          </Link>
        </Button>
      </li>
    </>
  )
}
