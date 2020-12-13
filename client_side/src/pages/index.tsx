import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Map from './Map'

const RouteWrapper: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/map" component={Map} />
      </Switch>
    </Router>
  )
}

export default RouteWrapper
