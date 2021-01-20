import { createContext } from 'react'

interface Properties {
  nickname?: string
  thumbnail_image?: string
  profile_image?: string
}

interface KakaoAccount {
  profile?: Properties
}

interface PlaceList {
  id: number
  name: string
  address: string
  photos: Array<string>
}

interface User {
  id?: number
  connected_at?: string
  properties?: Properties
  kakao_account?: KakaoAccount
  placeLists: Array<PlaceList> | []
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  toggleUser: (user: User | null) => void
  setPlaceLists: (placeLists: Array<PlaceList>) => void
}

const initialUserContextValue: UserContextType = {
  user: null,
  isLoggedIn: false,
  toggleUser(user: User | null) {
    this.user = user
    this.isLoggedIn = true
  },
  setPlaceLists(placeList: Array<PlaceList>) {}
}

const UserContext = createContext(initialUserContextValue)

export type { UserContextType, User, PlaceList }

export default UserContext
