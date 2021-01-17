import GridContainer from 'components/common/GridContainer'
import Information from 'components/user/Information'
import { RouteComponentProps } from 'react-router-dom'
import { Skeleton, Space } from 'antd'
import { useFetchUser } from 'components/user/hooks/user-hooks'
import { Title } from 'components/common/typography'
import Reviews from 'components/user/Reviews'
import Places from 'components/user/Places'

const UserLoading = () => {
  return <Skeleton avatar active paragraph={{ rows: 5 }} />
}

const Info: React.FC<RouteComponentProps> = () => {
  const [user, loading] = useFetchUser()

  return (
    <GridContainer>
      <Space direction="vertical" style={{ display: 'flex' }}>
        {loading ? (
          <UserLoading />
        ) : user ? (
          <>
            <Information profile={user.user_profile} name={user.username} />
            <Reviews review={user.user_reviews} />
            <Places place={[{ a: '1', b: ' 2' }]} />
          </>
        ) : (
          <Title level={4} style={{ textAlign: 'center' }}>
            유저 정보를 찾을 수 없음
          </Title>
        )}
      </Space>
    </GridContainer>
  )
}

export default Info
