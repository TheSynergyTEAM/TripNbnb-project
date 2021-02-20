import { RButton } from './Container'
import {
  postReservation,
  Reservation,
  ReservationInformation
} from 'components/map/hooks/reservation-hooks'
import { useContext, useState } from 'react'
import UserContext from 'context/User'
import { notification } from 'antd'
import moment from 'moment'
import MarkerContext from 'context/Marker'

interface FooterProps extends ReservationInformation {
  readonly disabled: boolean
  readonly onReservation: Function
  readonly checkLoading: boolean
}

const Footer: React.FC<FooterProps> = ({
  disabled,
  date,
  peopleCount,
  room,
  onReservation,
  price,
  checkLoading
}) => {
  const [loading, setLoading] = useState(false)
  const { user, isLoggedIn } = useContext(UserContext)
  const { detailItem } = useContext(MarkerContext)

  const handleReservation = async () => {
    setLoading(true)

    if (!user || !isLoggedIn) {
      return
    } else {
      const checkIn = moment(date.checkIn).format('YYYY-MM-DD')
      const checkOut = moment(date.checkOut).format('YYYY-MM-DD')
      const reservation: Reservation = {
        date: {
          checkIn,
          checkOut
        },
        peopleCount,
        room,
        place: detailItem,
        user,
        price
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
        loading={loading || checkLoading}
        onClick={handleReservation}
        buttonShape={true}
      >
        {disabled ? '예약불가' : '예약하기'}
      </RButton>
    </>
  )
}

export default Footer
