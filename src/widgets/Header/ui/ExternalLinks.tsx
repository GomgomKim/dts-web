import Link from 'next/link'

import { Button } from '@/shared/ui'

export const ExternalLinks = () => {
  return (
    <>
      <li>
        <Button asChild variant="link">
          <Link href="https://medium.com/do-things-with-ai" target="_blank">
            Medium
          </Link>
        </Button>
      </li>
      <li>
        <Button asChild variant="link">
          <Link
            href="https://www.instagram.com/dothings.studio/"
            target="_blank"
          >
            Instagram
          </Link>
        </Button>
      </li>
    </>
  )
}
