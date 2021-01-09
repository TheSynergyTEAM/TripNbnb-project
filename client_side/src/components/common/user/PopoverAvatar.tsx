import { List, Popover } from 'antd'
import styled from 'styled-components'
import { PrimaryText, Title } from '../typography'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Avatar from './Avatar'
import UserContext from 'context/User'
import { useContext } from 'react'

const menuItem = [
  {
    name: '내 정보 보기',
    type: 'myinfo'
  },
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
  const { toggleUser, isLoggedIn, user } = useContext(UserContext)
  const history = useHistory()

  const handleItemClick = (type: string) => {
    const loginCheck = !window.Kakao.Auth.getAccessToken() || !isLoggedIn

    if (loginCheck) return

    switch (type) {
      case 'myinfo':
        history.push(`/info/${user?.id}`)
        return
      case 'logout':
        window.Kakao.Auth.logout(() => toggleUser(null))
        return
      case 'unlink':
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: (response: any) => {
            window.Kakao.Auth.setAccessToken('')
            axios.post('/users/unlink/', response)
            toggleUser(null)
          },
          fail: (reason: any) => console.error(reason)
        })
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
    user && (
      <Popover trigger="click" content={<PopoverContent />}>
        <Avatar user={user} />
        <></>
      </Popover>
    )
  )
}

export default PopoverAvatar
