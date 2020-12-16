import { createContext } from 'react'

interface UserContextType {
  user: any
  isLoggedIn: boolean
  toggleUser: (user: any) => void
}

const initialUserContextValue: UserContextType = {
  user: null,
  isLoggedIn: false,
  toggleUser(user) {
    this.user = user
    this.isLoggedIn = true
  }
}

const User = createContext(initialUserContextValue)

export default User
