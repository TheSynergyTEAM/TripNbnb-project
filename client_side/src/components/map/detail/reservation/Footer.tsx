import { RButton } from './Container'
import {
  ReservationInformation
  // postReservation
} from 'components/map/hooks/reservation-hooks'
import { useState } from 'react'

interface FooterProps extends ReservationInformation {
  readonly disabled: boolean
}

const Footer: React.FC<FooterProps> = ({ disabled }) => {
  const [loading, setLoading] = useState(false)

  const handleReservation = async () => {
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
    }, 1500)
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
