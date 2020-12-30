import Avatar from 'components/common/user/Avatar'
import UserContext from 'context/User'
import { useContext } from 'react'
import styled from 'styled-components'

const StyledInformationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const MyInformation: React.FC = () => {
  const { user } = useContext(UserContext)

  return (
    <StyledInformationWrapper>
      {user && (
        <>
          <Avatar user={user} size={50} cursor={false} />
        </>
      )}
    </StyledInformationWrapper>
  )
}

export default MyInformation
