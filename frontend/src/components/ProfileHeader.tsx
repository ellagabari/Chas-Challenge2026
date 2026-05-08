//Det här en komponent för att visa användarens profilheader, som inkluderar avatar, namn och level

interface ProfileHeaderProps {
  username: string | null // Användarens namn, kan vara null
  level: number
}

const getInitial = (username: string) => username.charAt(0).toUpperCase()

const getAvatarColor = (username: string) => {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']
  const hash = username.charCodeAt(0)
  return colors[hash % colors.length]
}

const ProfileHeader = ({ username, level }: ProfileHeaderProps) => {
  const displayName = username ?? 'User'
  const initial = getInitial(displayName)
  const avatarColor = getAvatarColor(displayName)

  return (
    <div className="flex items-center gap-4 p-4">

      {/* Avatar */}
      <div className={`w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center overflow-hidden text-white text-2xl font-bold`}>
        {initial}
      </div>

      {/* Namn och level */}
      <div className="flex flex-col gap-1">
        <span className="text-white font-semibold text-lg">
          {username ?? 'User'}
        </span>
        <span className="text-primary text-sm border border-primary rounded-full px-3 py-0.5 w-fit">
          Level {level}
        </span>
      </div>

    </div>
  )
}

export default ProfileHeader