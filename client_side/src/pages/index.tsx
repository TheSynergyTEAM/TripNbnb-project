import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const RouteWrapper: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* Todo Page Component */}
        </Route>
        <Route path="/map">{/* Todo Page Component */}</Route>
      </Switch>
    </Router>
  )
}

export default RouteWrapper
