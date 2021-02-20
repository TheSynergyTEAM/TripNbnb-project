import UserProfileContext from 'context/UserProfile'
import { useContext } from 'react'
import Divider from './Divider'

const UserReservation: React.FC = () => {
  const { user_reservation } = useContext(UserProfileContext)

  return <Divider title="내 예약 정보">{user_reservation.length}</Divider>
}

export default UserReservation
