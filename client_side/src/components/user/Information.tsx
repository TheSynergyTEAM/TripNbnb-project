import { Avatar } from 'antd'
import { PrimaryText } from 'components/common/typography'
import styled from 'styled-components'
import { FetchUser } from './hooks/user-hooks'

interface UserInformationProps {
  user?: FetchUser | null
}

const StyledInformationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const StyledTitle = styled.div`
  font-size: 1.2rem;
  margin-left: 0.8rem;
`

const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
  return user ? (
    <StyledInformationWrapper>
      <>
        <Avatar src={user.user_profile} size={50} />
        <StyledTitle>
          <PrimaryText style={{ fontWeight: 'bold' }}>
            {user.username}
          </PrimaryText>
          님의 프로필 정보
        </StyledTitle>
      </>
    </StyledInformationWrapper>
  ) : null
}

export default UserInformation
