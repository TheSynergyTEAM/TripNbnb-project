import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Map from './Map'
import Info from './Info'
import Search from './Search'
import SearchDetail from './SearchDetail'
import Header from 'components/common/Header'

const RouteWrapper: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/map" component={Map} />
        <Route exact path="/info/:id" component={Info} />
        {/* Page what view result search item by keyword(place name, etc...) */}
        <Route exact path="/search" component={Search} />
        {/* Page what view detail search item */}
        <Route exact path="/search/:id" component={SearchDetail} />
      </Switch>
    </Router>
  )
}

export default RouteWrapper
