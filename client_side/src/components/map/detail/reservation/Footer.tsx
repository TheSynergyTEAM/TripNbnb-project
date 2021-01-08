import { RButton } from './Container'
import {
  postReservation,
  Reservation,
  ReservationInformation
  // postReservation
} from 'components/map/hooks/reservation-hooks'
import { useContext, useState } from 'react'
import UserContext from 'context/User'
import { notification } from 'antd'
import moment from 'moment'
import MarkerContext from 'context/Marker'

interface FooterProps extends ReservationInformation {
  readonly disabled: boolean
  readonly onReservation: Function
}

const Footer: React.FC<FooterProps> = ({
  disabled,
  date,
  peopleCount,
  room,
  onReservation
}) => {
  const [loading, setLoading] = useState(false)
  const { user, isLoggedIn } = useContext(UserContext)
  const { detailItem } = useContext(MarkerContext)

  const handleReservation = async () => {
    setLoading(true)

    if (!user || !isLoggedIn) {
      return
    } else {
      const checkIn = moment(date.checkIn).format('YYYY-MM-DD 14:00:00')
      const checkOut = moment(date.checkOut).format('YYYY-MM-DD 11:00:00')
      const reservation: Reservation = {
        date: {
          checkIn,
          checkOut
        },
        peopleCount,
        room,
        place: detailItem,
        user
      }
      try {
        await postReservation(reservation)
        notification.success({
          message: '예약 완료',
          description: `체크 인: ${checkIn}, 체크 아웃: ${checkOut}`,
          placement: 'topLeft'
        })
        onReservation()
      } catch (error) {
        notification.error({
          message: error.message,
          description: '예약 실패',
          placement: 'topLeft'
        })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <RButton
        disabled={disabled}
        loading={loading}
        onClick={handleReservation}
      >
        예약하기
      </RButton>
    </>
  )
}

export default Footer
