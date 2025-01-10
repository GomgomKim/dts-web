import Link from 'next/link'

import { Button } from '@/shared/ui'

import { UI_TEXT } from '../model/constants'

export const ExternalLinks = () => {
  return (
    <>
      <li>
        <Button asChild variant="link">
          <Link href="https://medium.com/do-things-with-ai" target="_blank">
            {UI_TEXT.MEDIUM}
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild variant="link">
          <Link
            href="https://www.instagram.com/dothings.studio/"
            target="_blank"
          >
            {UI_TEXT.INSTAGRAM}
          </Link>
        </Button>
      </li>
    </>
  )
}
