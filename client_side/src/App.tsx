import React, { useState } from 'react'
import RouteWrapper from 'pages'
import User from 'context/User'

const { Provider: UserProvider } = User

const App: React.FC = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const toggleUser = (user: any) => {
    setUser(user)
    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <UserProvider value={{ user, isLoggedIn, toggleUser }}>
        <RouteWrapper />
      </UserProvider>
    </div>
  )
}

export default App
