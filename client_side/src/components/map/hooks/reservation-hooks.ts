import axios from 'axios'
import { User } from 'context/User'
import { Moment } from 'moment'
import { Room } from 'components/map/detail/reservation/Modal'

interface ReservationInformation {
  date: {
    checkIn: Moment | string | undefined
    checkOut: Moment | string | undefined
  }
  peopleCount: number
  room: Room
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
  placeId: number | string,
  room: string,
  checkIn: string,
  checkOut: string
) {
  try {
    const { data: reservationData } = await axios.get(
      `/reservations/place/${placeId}`,
      {
        params: {
          room,
          checkIn,
          checkOut
        }
      }
    )
    return reservationData
  } catch (error) {
    throw new Error(error)
  }
}

export type { Reservation, ReservationInformation }
