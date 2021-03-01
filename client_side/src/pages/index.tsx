import React, { Suspense, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom'
import Header from 'components/common/Header'
import styled from 'styled-components'
import { Spin } from 'antd'
import LoadingIcon from '@ant-design/icons/LoadingOutlined'

const SwitchWrapperComponent: React.FC<RouteComponentProps> = ({
  children,
  location
}) => {
  const styledMain = useMemo<React.CSSProperties>(() => {
    if (location.pathname === '/') {
      return {
        position: 'static',
        top: 0
      }
    } else {
      return {
        position: 'relative',
        top: '64px'
      }
    }
  }, [location.pathname])

  return <main style={styledMain}>{children}</main>
}

const SwitchWrapper = withRouter(SwitchWrapperComponent)

const StyledGlobalLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Main = React.lazy(() => import('./Main'))
const Map = React.lazy(() => import('./Map'))
const Info = React.lazy(() => import('./Info'))
const Search = React.lazy(() => import('./Search'))
const SearchDetail = React.lazy(() => import('./SearchDetail'))

const GlobalLoading: React.FC = () => {
  return (
    <StyledGlobalLoading>
      <Spin indicator={<LoadingIcon spin />} />
    </StyledGlobalLoading>
  )
}

const RouteWrapper: React.FC = () => {
  return (
    <Router>
      <Header />
      <SwitchWrapper>
        <Switch>
          <Suspense fallback={<GlobalLoading />}>
            <Route exact path="/" component={Main} />
            <Route path="/map" component={Map} />
            <Route exact path="/info/:id" component={Info} />
            {/* Page what view result search item by keyword(place name, etc...) */}
            <Route exact path="/search" component={Search} />
            {/* Page what view detail search item */}
            <Route exact path="/search/:id" component={SearchDetail} />
          </Suspense>
        </Switch>
      </SwitchWrapper>
    </Router>
  )
}

export default RouteWrapper
