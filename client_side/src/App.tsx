import React, { useState } from 'react'
import RouteWrapper from 'pages'
import UserContext from 'context/User'
import type { PlaceList, User } from 'context/User'

const { Provider: UserProvider } = UserContext

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleUser = (user: any | null) => {
    if (user == null) {
      setUser(null)
      setIsLoggedIn(false)
    } else {
      setUser(user)
      setIsLoggedIn(true)
    }
  }

  const setPlaceLists = (placeLists: Array<PlaceList>) => {
    if (!user || !isLoggedIn) {
      return
    }

    setUser({ ...user, placeLists })
  }

  return (
    <div className="app">
      <UserProvider value={{ user, isLoggedIn, toggleUser, setPlaceLists }}>
        <RouteWrapper />
      </UserProvider>
    </div>
  )
}

export default App
