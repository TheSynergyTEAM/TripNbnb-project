import { createContext } from 'react'

export enum RoomType {
  ROOM_SINGLE = '싱글룸',
  ROOM_DOUBLE = '더블룸',
  ROOM_TWIN = '트윈룸',
  ROOM_TRIPLE = '트리플룸',
  ROOM_SUITE = '스위트룸',
  TYPE_SINGLE = 'ROOM_SINGLE',
  TYPE_DOUBLE = 'ROOM_DOUBLE',
  TYPE_TWIN = 'ROOM_TWIN',
  TYPE_TRIPLE = 'ROOM_TRIPLE',
  TYPE_SUITE = 'ROOM_SUITE'
}

export type UserReservation = {
  check_in: string
  check_out: string
  place: string
  place_type: RoomType
  price: number
}

export type UserReview = {
  place: string
  review: string
}

export type UserProfileContextType = {
  user_biography: string
  user_profile: string // url
  user_reservation: UserReservation[] | []
  user_reviews: UserReview[] | []
  username: string
  loading: boolean
}

export const initialContext: UserProfileContextType = {
  user_biography: '',
  user_profile: '',
  user_reservation: [],
  user_reviews: [],
  username: '',
  loading: true
}

const UserProfileContext = createContext<UserProfileContextType>(initialContext)

export default UserProfileContext
