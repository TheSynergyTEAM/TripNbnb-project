import { Button, Tooltip } from 'antd'
import UserContext from 'context/User'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import SendOutlined from '@ant-design/icons/SendOutlined'
import ReservationModal from './ReservationModal'

const StyledButton = styled(Button)`
  margin: 0.5rem 1rem;
`

const RButton: React.FC<any> = (props) => (
  <StyledButton type="primary" shape="round" {...props} icon={<SendOutlined />}>
    예약하기
  </StyledButton>
)

const Reservation: React.FC = () => {
  const [openReservationModal, setOpenReservationModal] = useState(false)
  const { isLoggedIn } = useContext(UserContext)

  return (
    <>
      {isLoggedIn ? (
        <RButton
          onClick={() => setOpenReservationModal(!openReservationModal)}
        />
      ) : (
        <Tooltip title="로그인이 필요한 서비스입니다.">
          <RButton type="default" />
        </Tooltip>
      )}
      <ReservationModal
        active={openReservationModal}
        handle={setOpenReservationModal}
      />
    </>
  )
}

export { RButton }
export default Reservation
