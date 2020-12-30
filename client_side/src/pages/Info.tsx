import GridContainer from 'components/common/GridContainer'
import MyInformation from 'components/user/MyInformation'
import OtherInformation from 'components/user/OtherInformation'
import RequiredLogin from 'components/user/RequiredLogin'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { Space } from 'antd'
import { useCallback } from 'react'

const Info: React.FC<RouteComponentProps> = () => {
  const { id } = useParams<{ id?: string }>()

  const isPass = useCallback(() => {
    return !!id
  }, [id])

  return (
    <GridContainer>
      <RequiredLogin pass={isPass()}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {isPass() ? <OtherInformation /> : <MyInformation />}
        </Space>
      </RequiredLogin>
    </GridContainer>
  )
}

export default Info
