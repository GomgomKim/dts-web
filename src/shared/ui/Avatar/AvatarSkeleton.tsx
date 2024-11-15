import UserIcon from '/public/icons/user.svg'

export const AvatarSkeleton = () => {
  return (
    <div className="size-10 overflow-hidden rounded-full">
      <div className="relative size-full bg-neutral-2">
        <UserIcon className="absolute-center" />
      </div>
    </div>
  )
}
