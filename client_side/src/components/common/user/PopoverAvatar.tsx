import { Avatar, List, Popover } from 'antd'
import UserContext from 'context/User'
import { useContext } from 'react'
import styled from 'styled-components'
import { PrimaryText, Title } from '../typography'

const menuItem = [
  {
    name: '로그아웃',
    type: 'logout'
  },
  {
    name: '회원탈퇴',
    type: 'unlink'
  }
]

const StyledListItem = styled(List.Item)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const PopoverContent: React.FC<any> = () => {
  const handleItemClick = (type: string) => {
    switch (type) {
      case 'logout':
        console.log('로그아웃')
        return
      case 'unlink':
        console.log('회원탈퇴')
        return
      default:
        return
    }
  }

  return (
    <List
      dataSource={menuItem}
      renderItem={(item) => (
        <StyledListItem
          onClick={(e) => handleItemClick(item.type)}
          style={{ cursor: 'pointer' }}
        >
          <Title level={5}>
            <PrimaryText>{item.name}</PrimaryText>
          </Title>
        </StyledListItem>
      )}
    />
  )
}

const PopoverAvatar: React.FC = () => {
  const { user } = useContext(UserContext)

  return (
    <Popover trigger="click" content={<PopoverContent />}>
      <Avatar
        {...(user?.properties.thumbnail_image
          ? { src: user?.properties.thumbnail_image }
          : {})}
        size={30}
        style={{ cursor: 'pointer' }}
      >
        {user?.properties.thumbnail_image ? '' : user?.properties.nickname[0]}
      </Avatar>
    </Popover>
  )
}

export default PopoverAvatar
