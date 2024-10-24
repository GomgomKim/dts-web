import UserIcon from '/public/icons/user.svg'

export const AvatarSkeleton = () => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <div className="bg-neutral-2 w-full h-full relative">
        <UserIcon className="absolute-center" />
      </div>
    </div>
  )
}
