import { Button, Tooltip } from 'antd'
import UserContext from 'context/User'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import SendOutlined from '@ant-design/icons/SendOutlined'
import ReservationModal from 'components/map/detail/reservation/Modal'

type ReservationProps = {
  place: daum.maps.services.PlacesSearchResultItem
  map?: boolean
}

const StyledButton = styled(Button)`
  margin: 0.5rem 1rem;
`

const RButton: React.FC<any> = (props) =>
  props.buttonShape ? (
    <StyledButton
      type="primary"
      shape="round"
      icon={<SendOutlined />}
      onClick={props.onClick}
      disabled={props.disabled}
      loading={props.loading}
    >
      {props.children || '예약하기'}
    </StyledButton>
  ) : (
    <Tooltip title="예약하기">
      <Button
        type="default"
        shape="circle"
        icon={<SendOutlined />}
        onClick={props.onClick}
        style={{ marginLeft: '5px' }}
        disabled={props.disabled}
        loading={props.loading}
      />
    </Tooltip>
  )

const Reservation: React.FC<ReservationProps> = ({ place, map }) => {
  const [openReservationModal, setOpenReservationModal] = useState(false)
  const { isLoggedIn } = useContext(UserContext)
  const buttonShape = map || false

  return (
    <>
      {isLoggedIn ? (
        <RButton
          onClick={() => setOpenReservationModal(!openReservationModal)}
          buttonShape={buttonShape}
        />
      ) : (
        <Tooltip title="로그인이 필요한 서비스입니다.">
          <RButton type="default" />
        </Tooltip>
      )}
      <ReservationModal
        active={openReservationModal}
        handle={setOpenReservationModal}
        place={place}
        buttonShape={buttonShape}
      />
    </>
  )
}

export { RButton }
export default Reservation
