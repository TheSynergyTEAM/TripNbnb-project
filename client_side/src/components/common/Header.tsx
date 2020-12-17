import styled from 'styled-components'
import { Button, Row, Col } from 'antd'
import { purple } from '@ant-design/colors'
import { useContext, useState } from 'react'
import UserContext from 'context/User'
import Login from 'event/Login'
import Avatar from 'antd/lib/avatar/avatar'
import { NavLink } from 'react-router-dom'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${purple.primary};
  display: inline-block;
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
    lg: 4
  }
}

const StyledNavWrapper = styled.ul`
  margin: 0;
  padding: 0 0 0 0.5rem;
  list-style-type: none;
`

const NavWrapper: React.FC = ({ children }) => {
  const breakpoints = useBreakpoint()

  return (
    <StyledNavWrapper
      style={{ display: breakpoints.lg ? 'inline-block' : 'none' }}
    >
      {children}
    </StyledNavWrapper>
  )
}

const NavItem: React.FC<{ to: string; name: string }> = (props) => {
  return (
    <li>
      <NavLink to={props.to}>{props.name}</NavLink>
    </li>
  )
}

const Header: React.FC = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const { isLoggedIn, user } = useContext(UserContext)
  const breakpoint = useBreakpoint()

  const handleLogin = () => {
    if (isLoggedIn) {
      return
    }

    setOpenPopup(true)
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}
    >
      <Col {...columns.outer}>
        <Row justify="space-between" align="middle">
          <Col {...columns.inner}>
            <NavLink to="/">
              <Title>{process.env.REACT_APP_PROJECT_NAME?.toUpperCase()}</Title>
            </NavLink>
          </Col>
          <Col
            {...columns.inner}
            style={{ display: breakpoint.lg ? 'block' : 'none' }}
          >
            <NavWrapper>
              <NavItem to="/map" name="Map" />
            </NavWrapper>
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
