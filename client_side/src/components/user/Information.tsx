import { Avatar } from 'antd'
import UserProfileContext from 'context/UserProfile'
import { useContext } from 'react'
import styled from 'styled-components'

const StyledInformationWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  position: relative;

  @media screen and (min-width: 720px) {
    position: sticky;
    top: 5rem;
  }
`

const StyledTitle = styled.div`
  margin-top: 1rem;
`

const UserInformation: React.FC = () => {
  const { user_profile, username } = useContext(UserProfileContext)

  return (
    <StyledInformationWrapper>
      <Avatar src={user_profile} size={100} shape="square" />
      <StyledTitle>
        <h1>{username}</h1>
      </StyledTitle>
    </StyledInformationWrapper>
  )
}

export default UserInformation
