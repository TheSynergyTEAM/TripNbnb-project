import UserContext from 'context/User'
import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  font-size: 4rem;
  font-weight: bold;
`

class RequiredLogin extends React.Component {
  static contextType = UserContext

  render() {
    return (
      <UserContext.Consumer>
        {(user) =>
          user.isLoggedIn ? (
            this.props.children
          ) : (
            <StyledWrapper>로그인이 필요한 페이지입니다.</StyledWrapper>
          )
        }
      </UserContext.Consumer>
    )
  }
}

export default RequiredLogin
