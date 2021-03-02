import UserProfileContext, {
  RoomType,
  UserReservation as UserReservationType
} from 'context/UserProfile'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import Divider from './Divider'
import { purple } from '@ant-design/colors'
import { Button, Statistic } from 'antd'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import Modal from 'antd/lib/modal/Modal'
import { cancelReservation } from 'components/map/hooks/reservation-hooks'

type ReItemProps = {
  reservation: UserReservationType
  update: (id: number) => void
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

    &.cancel {
      & button {
        color: gray;

        &:hover {
          color: ${purple.primary};
        }
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

const ReItem: React.FC<ReItemProps> = ({ reservation, update }) => {
  const [cancelModal, setCancelModal] = useState(false)

  const cancelReservationInComponent = async () => {
    await cancelReservation(reservation.id)
    update(reservation.id)
    setCancelModal(false)
  }

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
      <span className="cancel">
        <Button
          icon={<CloseOutlined />}
          type="text"
          size="small"
          onClick={(e) => setCancelModal(!cancelModal)}
        />
        <Modal
          title="예약 취소"
          visible={cancelModal}
          width={300}
          onOk={(e) => cancelReservationInComponent()}
          onCancel={(e) => setCancelModal(false)}
          okText="예약 취소"
          cancelText="아니오"
        >
          예약을 취소할까요?
        </Modal>
      </span>
    </StyledReItem>
  )
}

const UserReservation: React.FC = () => {
  const { user_reservation, updateReservation } = useContext(UserProfileContext)

  const removeItemByID = (id: number) => {
    const target = user_reservation.findIndex((item) => item.id === id)

    if (target !== -1) {
      user_reservation.splice(target, 1)
    }

    updateReservation(user_reservation)
  }

  return (
    <Divider title="내 예약 정보">
      {user_reservation.length ? (
        (user_reservation as UserReservationType[]).map((re, i) => (
          <ReItem reservation={re} key={i} update={removeItemByID} />
        ))
      ) : (
        <p>예약 정보가 없습니다.</p>
      )}
    </Divider>
  )
}

export default UserReservation
