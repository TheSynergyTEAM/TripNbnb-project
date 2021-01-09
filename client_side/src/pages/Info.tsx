import GridContainer from 'components/common/GridContainer'
import Information from 'components/user/Information'
import { RouteComponentProps } from 'react-router-dom'
import { Space } from 'antd'
import { useFetchUser } from 'components/user/hooks/user-hooks'

const Info: React.FC<RouteComponentProps> = () => {
  const [user] = useFetchUser()

  return (
    <GridContainer>
      <Space direction="vertical" style={{ display: 'flex' }}>
        {user ? <Information user={user} /> : <div>loading...</div>}
      </Space>
    </GridContainer>
  )
}

export default Info
