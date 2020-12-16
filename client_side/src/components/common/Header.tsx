import styled from 'styled-components'
import { Button } from 'antd'
import { purple } from '@ant-design/colors'
import { useContext, useState } from 'react'
import UserContext from 'context/User'
import Login from 'event/Login'
import Avatar from 'antd/lib/avatar/avatar'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0.5rem;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${purple.primary};
`

const Header: React.FC = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const { isLoggedIn, user } = useContext(UserContext)

  const handleLogin = () => {
    if (isLoggedIn) {
      return
    }

    setOpenPopup(true)
  }

  return (
    <StyledHeader className="shadow-box">
      <Title>{process.env.REACT_APP_PROJECT_NAME?.toUpperCase()}</Title>
      {isLoggedIn ? (
        <div>
          <Avatar
            {...(user?.properties.thumbnail_image
              ? { src: user?.properties.thumbnail_image }
              : {})}
            size={40}
          >
            {user?.properties.thumbnail_image
              ? ''
              : user?.properties.nickname[0]}
          </Avatar>
        </div>
      ) : (
        <div className="login">
          <Button onClick={handleLogin}>로그인</Button>
          {openPopup && <Login />}
        </div>
      )}
    </StyledHeader>
  )
}

export default Header
