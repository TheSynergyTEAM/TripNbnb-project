import styled from 'styled-components'
import { Button, Row, Col, Dropdown, Menu as AntMenu } from 'antd'
import { createRef, useContext, useEffect, useState } from 'react'
import UserContext from 'context/User'
import Login from 'event/Login'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import PopoverAvatar from './user/PopoverAvatar'
import GridContainer from './GridContainer'
import DownOutlined from '@ant-design/icons/DownOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { purple } from '@ant-design/colors'

type GhostProps = {
  active: boolean
}

const StyledTitle = styled.div`
  font-family: 'Aquire Bold';
  font-size: 1.5rem;
  font-weight: bolder;
  color: ${(props) => props.color};
  transition: color 0.5s ease;
`

const Title: React.FC<GhostProps> = ({ active }) => (
  <NavLink to="/">
    <StyledTitle color={active ? 'white' : purple[4]}>TRIPNBNB</StyledTitle>
  </NavLink>
)

const Menu = () => (
  <AntMenu>
    <AntMenu.Item key="map">
      <NavLink to="/map">맵에서 검색하기</NavLink>
    </AntMenu.Item>
    <AntMenu.Item key="list">
      <NavLink to="/search">리스트로 검색하기</NavLink>
    </AntMenu.Item>
  </AntMenu>
)

const useLocationList = (location: Partial<Location>): boolean => {
  const [isLocationList, setIsLocationList] = useState(false)

  useEffect(() => {
    if (location.pathname)
      setIsLocationList(location.pathname.startsWith('/search'))
  }, [location.pathname])

  return isLocationList
}

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  const [ghost, setGhost] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const { isLoggedIn } = useContext(UserContext)
  const headerRef = createRef<HTMLDivElement>()

  const isListPage = useLocationList(location)

  const handleLogin = () => {
    if (isLoggedIn) {
      return
    } else {
      setOpenPopup(true)
    }
  }

  const scrollEvent = (e: Event) => {
    if (window.scrollY >= 100) {
      setGhost(false)
    } else {
      setGhost(true)
    }
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setGhost(true)

      window.addEventListener('scroll', scrollEvent)
    } else {
      setGhost(false)
    }

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
    // eslint-disable-next-line
  }, [location.pathname])

  return (
    <GridContainer
      ref={headerRef}
      rowStyle={{
        top: '0',
        backgroundColor: ghost ? 'transparent' : 'white',
        zIndex: 25,
        position: 'fixed',
        width: '100%',
        overflow: 'hidden',
        borderBottom: ghost ? 'none' : isListPage ? 'none' : '1px solid #ddd'
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title active={ghost} />
        </Col>
        <Col>
          <Dropdown
            placement="bottomCenter"
            overlay={Menu}
            trigger={['click']}
            arrow
          >
            <Button
              ghost={ghost}
              {...(ghost ? { type: 'default' } : { type: 'primary' })}
              shape="round"
              style={{ marginRight: '10px' }}
            >
              검색 <DownOutlined />
            </Button>
          </Dropdown>
          {isLoggedIn ? (
            <PopoverAvatar />
          ) : (
            <>
              <Button
                type="default"
                shape="circle"
                icon={<UserOutlined />}
                onClick={handleLogin}
              />
              <Login popup={openPopup} onPopup={setOpenPopup} />
            </>
          )}
        </Col>
      </Row>
    </GridContainer>
  )
}

export default withRouter(Header)
