import GridContainer from 'components/common/GridContainer'
import RequiredLogin from 'components/user/RequiredLogin'
import { RouteComponentProps } from 'react-router-dom'

const Info: React.FC<RouteComponentProps> = () => {
  return (
    <GridContainer>
      <RequiredLogin>Hello</RequiredLogin>
    </GridContainer>
  )
}

export default Info
