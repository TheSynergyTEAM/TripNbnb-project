import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SearchDetail from './SearchDetail'
import Header from 'components/common/Header'
import styled from 'styled-components'
import { Spin } from 'antd'
import LoadingIcon from '@ant-design/icons/LoadingOutlined'

const SwitchWrapper = styled.section`
  position: relative;
`

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
