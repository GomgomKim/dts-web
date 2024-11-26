import Image from 'next/image'

interface AvatarProps {
  profileImageUrl: string
}

export const Avatar = ({ profileImageUrl }: AvatarProps) => {
  return (
    <div className="size-10 overflow-hidden rounded-full">
      <Image src={profileImageUrl} alt="profile image" width={40} height={40} />
    </div>
  )
}
