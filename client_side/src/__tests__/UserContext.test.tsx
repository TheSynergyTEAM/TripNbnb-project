import React from 'react'
import { render, screen } from '@testing-library/react'
import UserContext, { UserContextType } from 'context/User'

const { Consumer, Provider } = UserContext

const initialValue: UserContextType = {
  isLoggedIn: false,
  toggleUser(user: any) {
    if (user !== null) {
      this.isLoggedIn = true
      this.user = user
    } else {
      this.isLoggedIn = false
      this.user = null
    }
  },
  user: null
}

const customRender = (extend: React.ReactNode, props: UserContextType) => {
  return render(<Provider value={{ ...props }}>{extend}</Provider>)
}

const MockConsumer = () => (
  <Consumer>
    {(userObj) =>
      userObj.isLoggedIn ? (
        userObj.user && <div>{userObj.user.properties?.nickname}</div>
      ) : (
        <div>not logged in</div>
      )
    }
  </Consumer>
)

test('UserContext shows message if not logged in', () => {
  customRender(<MockConsumer />, initialValue)
  expect(screen.getByText(/not logged in/)).toBeInTheDocument()
})

test('UserContext shows message if logged in', () => {
  customRender(<MockConsumer />, {
    isLoggedIn: true,
    toggleUser: (_) => {},
    user: { properties: { nickname: 'Jane' } }
  })
  expect(screen.getByText(/Jane/)).toBeInTheDocument()
})

test('UserContext shows message if logged in with toggleUser', () => {
  initialValue.toggleUser({ properties: { nickname: 'Jane' } })
  customRender(<MockConsumer />, initialValue)
  expect(screen.getByText(/Jane/)).toBeInTheDocument()
})

test('UserContext should be null when user logout', () => {
  // already logged in
  initialValue.toggleUser(null)
  customRender(<MockConsumer />, initialValue)
  expect(screen.getByText(/not logged in/)).toBeInTheDocument()
})
