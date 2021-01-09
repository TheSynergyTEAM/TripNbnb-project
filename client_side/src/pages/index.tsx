import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Map from './Map'
import Info from './Info'
import Header from 'components/common/Header'

const RouteWrapper: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/map" component={Map} />
        <Route exact path="/info/:id" component={Info} />
      </Switch>
    </Router>
  )
}

export default RouteWrapper
