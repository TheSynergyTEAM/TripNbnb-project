import Avatar from 'components/common/user/Avatar'
import { User } from 'context/User'
import styled from 'styled-components'

interface UserInformationProps {
  user?: User | null
}

const StyledInformationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
  return user ? (
    <StyledInformationWrapper>
      {user.id && (
        <>
          <Avatar user={user} size={50} cursor={false} />
          render test
        </>
      )}
    </StyledInformationWrapper>
  ) : null
}

export default UserInformation
