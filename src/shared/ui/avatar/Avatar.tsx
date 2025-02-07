import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

interface AvatarProps {
  profileImageUrl: string
  className?: string
}

export const Avatar = (props: AvatarProps) => {
  return (
    <div
      className={cn('size-10 overflow-hidden rounded-full', props.className)}
    >
      <Image
        src={props.profileImageUrl}
        alt="profile image"
        width={40}
        height={40}
      />
    </div>
  )
}
