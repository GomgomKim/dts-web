import Image from 'next/image'

interface AvatarProps {
  profileImageUrl: string
}

export const Avatar = ({ profileImageUrl }: AvatarProps) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <Image src={profileImageUrl} alt="profile image" width={40} height={40} />
    </div>
  )
}
