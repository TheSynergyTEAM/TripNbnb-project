import { createContext } from 'react'

interface Properties {
  nickname: string
  thumbnail_image?: string
  profile_image?: string
}

interface KakaoAccount {
  profile?: Properties
}

interface User {
  id: number
  connected_at: string
  properties: Properties
  kakao_account: KakaoAccount
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  toggleUser: (user: User) => void
}

const initialUserContextValue: UserContextType = {
  user: null,
  isLoggedIn: false,
  toggleUser(user: User) {
    this.user = user
    this.isLoggedIn = true
  }
}

const UserContext = createContext(initialUserContextValue)

export default UserContext
