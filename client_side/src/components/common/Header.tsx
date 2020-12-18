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
    span: 12
  },
  inner: {
    xs: 12,
    md: 9,
    lg: 4
  }
}

const HeaderRow = styled(Row)`
  background-color: white;
  position: fixed;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 25;
`

const StyledNavWrapper = styled.ul`
  margin: 0;
  padding: 0 0 0 2rem;
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

const NavItem: React.FC<{ to: string; name?: string }> = (props) => {
  return (
    <li style={{ display: 'inline-block' }}>
      <NavLink to={props.to}>{props.name || props.children}</NavLink>
    </li>
  )
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
    <HeaderRow justify="space-between" align="middle">
      <Col {...columns.inner}>
        <NavItem to="/">
          <Title>{process.env.REACT_APP_PROJECT_NAME?.toUpperCase()}</Title>
        </NavItem>
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
    </HeaderRow>
  )
}

export default Header
