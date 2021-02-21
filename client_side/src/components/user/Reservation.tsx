import UserProfileContext, {
  RoomType,
  UserReservation as UserReservationType
} from 'context/UserProfile'
import { useContext } from 'react'
import styled from 'styled-components'
import Divider from './Divider'
import { purple } from '@ant-design/colors'
import { Statistic } from 'antd'

type ReItemProps = {
  reservation: UserReservationType
}

const StyledReItem = styled.div`
  line-height: 2;

  > span {
    &.place-name,
    &.room-type {
      font-weight: bold;
    }

    &.room-type {
      color: ${purple[4]};
    }

    &.price {
      & .price-inner {
        display: inline-block;
      }
    }

    margin-right: 0.3rem;
  }
`

const transform = (rt: RoomType) => {
  switch (rt) {
    case 'ROOM_SINGLE':
      return RoomType.ROOM_SINGLE
    case 'ROOM_DOUBLE':
      return RoomType.ROOM_DOUBLE
    case 'ROOM_TWIN':
      return RoomType.ROOM_TWIN
    case 'ROOM_TRIPLE':
      return RoomType.ROOM_TRIPLE
    case 'ROOM_SUITE':
      return RoomType.ROOM_TWIN
  }
}

const ReItem: React.FC<ReItemProps> = ({ reservation }) => {
  return (
    <StyledReItem>
      <span className="check-in">{reservation.check_in}</span>
      <span className="separator">~</span>
      <span className="check-out">{reservation.check_out}</span>
      <span className="room-type">{transform(reservation.place_type)}</span>
      <span className="place-name">{reservation.place}</span>
      <span className="price">
        &#8361;
        <Statistic
          value={reservation.price}
          className="price-inner"
          valueStyle={{ fontSize: '1rem' }}
        />
      </span>
    </StyledReItem>
  )
}

const UserReservation: React.FC = () => {
  const { user_reservation } = useContext(UserProfileContext)

  return (
    <Divider title="내 예약 정보">
      {user_reservation.length ? (
        (user_reservation as UserReservationType[]).map((re, i) => (
          <ReItem reservation={re} key={i} />
        ))
      ) : (
        <p>예약 정보가 없습니다.</p>
      )}
    </Divider>
  )
}

export default UserReservation
