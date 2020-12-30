import { fetchUserById } from 'api/user'
import Avatar from 'components/common/user/Avatar'
import { User } from 'context/User'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledInformationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const OtherInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User>({})

  useEffect(() => {
    const fetchUser = async () => {
      const _user = await fetchUserById(id)
      setUser(_user)
    }
    fetchUser()

    return () => {
      setUser({})
    }
  }, [id])

  return (
    <StyledInformationWrapper>
      {user.id && (
        <>
          <Avatar user={user} size={50} cursor={false} />
          render test
        </>
      )}
    </StyledInformationWrapper>
  )
}

export default OtherInformation
