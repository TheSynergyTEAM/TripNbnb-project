import axios from 'axios'
import { User } from 'context/User'
import { Moment } from 'moment'
import { Room } from 'components/map/detail/reservation/Modal'
import { PriceInformation } from '../detail/reservation/Price'

interface ReservationInformation {
  date: {
    checkIn: Moment | string | undefined
    checkOut: Moment | string | undefined
  }
  peopleCount: number
  room: Room | null
  price: PriceInformation
}

interface Reservation extends ReservationInformation {
  user: User
  place: daum.maps.services.PlacesSearchResultItem | null
}

export async function postReservation(reservation: Reservation) {
  try {
    await axios.post('/reservations/place/create/', reservation)
  } catch (error) {
    throw new Error(error)
  }
}

export async function checkReservation(
  place: daum.maps.services.PlacesSearchResultItem,
  room: string,
  checkIn: string,
  checkOut: string
) {
  try {
    const { data } = await axios.post(`/reservations/place/check/`, {
      place,
      roomType: room,
      checkIn,
      checkOut
    })
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export type { Reservation, ReservationInformation }
