import styled from 'styled-components'
import { Button, Row, Col } from 'antd'
import { purple } from '@ant-design/colors'
import { useContext, useState } from 'react'
import UserContext from 'context/User'
import Login from 'event/Login'
import Avatar from 'antd/lib/avatar/avatar'

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${purple.primary};
`

const columns = {
  outer: {
    xs: 24,
    md: 18,
    lg: 12
  },
  inner: {
    xs: 12,
    md: 9,
    lg: 6
  }
}

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
    <Row
      className="shadow-box"
      justify="center"
      align="middle"
      style={{ padding: '1rem' }}
    >
      <Col {...columns.outer}>
        <Row justify="space-between">
          <Col {...columns.inner}>
            <Title>{process.env.REACT_APP_PROJECT_NAME?.toUpperCase()}</Title>
          </Col>
          <Col {...columns.inner} style={{ textAlign: 'right' }}>
            {isLoggedIn ? (
              <div>
                <Avatar
                  {...(user?.properties.thumbnail_image
                    ? { src: user?.properties.thumbnail_image }
                    : {})}
                  size={30}
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
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Header
