import styled from 'styled-components'
import { Button, Typography } from 'antd'
import { purple } from '@ant-design/colors'
import { useContext } from 'react'
import UserContext from 'context/User'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;
`

const Title = styled(Typography.Title)`
  background-color: ${purple.primary};
  color: #fff !important;
  padding: 0 0.5rem;
`

const Header: React.FC = () => {
  const { user, isLoggedIn } = useContext(UserContext)

  return (
    <StyledHeader>
      <Title level={3}>
        {process.env.REACT_APP_PROJECT_NAME?.toUpperCase()}
      </Title>
      {isLoggedIn ? (
        <div>user's profile</div>
      ) : (
        <div className="login">
          <Button>로그인</Button>
        </div>
      )}
    </StyledHeader>
  )
}

export default Header
