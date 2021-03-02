import { useEffect, useState } from 'react'
import GridContainer from 'components/common/GridContainer'
import Information from 'components/user/Information'
import { RouteComponentProps } from 'react-router-dom'
import { Col, Row, Skeleton } from 'antd'
import { useFetchUser } from 'components/user/hooks/user-hooks'
import Reviews from 'components/user/Reviews'
import Places from 'components/user/Places'
import UserProfileContext, {
  UserProfileContextType,
  initialContext
} from 'context/UserProfile'
import UserReservation from 'components/user/Reservation'

const UserLoading = () => {
  return <Skeleton avatar active paragraph={{ rows: 5 }} />
}

const Info: React.FC<RouteComponentProps> = () => {
  const [user, loading] = useFetchUser()
  const [contextUser, setContextUser] = useState<UserProfileContextType>(
    initialContext
  )

  contextUser.updateReservation = (r) => {
    setContextUser({ ...contextUser, user_reservation: r })
  }

  useEffect(() => {
    if (!loading && user) {
      setContextUser(user)
    }
  }, [loading, user])

  return (
    <GridContainer>
      <UserProfileContext.Provider value={contextUser}>
        {loading ? (
          <UserLoading />
        ) : user ? (
          <Row gutter={5}>
            <Col xs={24} lg={6}>
              <Information />
            </Col>
            <Col xs={24} lg={18}>
              <Reviews />
              <Places />
              <UserReservation />
            </Col>
          </Row>
        ) : (
          <div>noob</div>
        )}
      </UserProfileContext.Provider>
    </GridContainer>
  )
}

export default Info
