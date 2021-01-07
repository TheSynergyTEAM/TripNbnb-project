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
}

export async function postReservation(reservation: Reservation) {
  try {
    await axios.post('/reservation/', reservation)
  } catch (error) {
    throw new Error(error)
  }
}

export type { Reservation, ReservationInformation }
