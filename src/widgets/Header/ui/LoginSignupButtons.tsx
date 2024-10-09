import Link from 'next/link'

import { Button } from '@/shared/ui'

export const LoginSignupButtons = () => {
  return (
    <>
      <li>
        <Button asChild variant="link">
          <Link href="/login" scroll={false}>
            Log in
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild className="rounded-full">
          <Link href="/signup" scroll={false}>
            Sign up
          </Link>
        </Button>
      </li>
    </>
  )
}
