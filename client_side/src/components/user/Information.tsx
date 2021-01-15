import { Avatar } from 'antd'
import { PrimaryText } from 'components/common/typography'
import styled from 'styled-components'

interface UserInformationProps {
  profile: string
  name: string
}

const StyledInformationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const StyledTitle = styled.div`
  font-size: 1.2rem;
  margin-left: 0.8rem;
`

const UserInformation: React.FC<UserInformationProps> = ({ profile, name }) => {
  return (
    <StyledInformationWrapper>
      <>
        <Avatar src={profile} size={50} />
        <StyledTitle>
          <PrimaryText style={{ fontWeight: 'bold' }}>{name}</PrimaryText>
          님의 프로필 정보
        </StyledTitle>
      </>
    </StyledInformationWrapper>
  )
}

export default UserInformation
