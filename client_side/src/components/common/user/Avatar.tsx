import { Avatar as LibAvatar } from 'antd'
import { User } from 'context/User'

interface AvatarProps {
  user: User
  size?: number
  style?: React.CSSProperties
  cursor?: boolean
}

const Avatar: React.FC<AvatarProps> = ({
  user,
  size,
  style,
  cursor = true
}) => {
  const avatarSize = size || 30

  return (
    <LibAvatar
      {...(user.properties?.thumbnail_image
        ? { src: user.properties.thumbnail_image }
        : {})}
      size={avatarSize}
      style={{ cursor: cursor ? 'pointer' : 'default', ...style }}
    >
      {user.properties?.thumbnail_image ? '' : user.properties?.nickname![0]}
    </LibAvatar>
  )
}

export default Avatar
