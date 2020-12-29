import { render } from '@testing-library/react'
import RequiredLogin from 'components/user/RequiredLogin'
import UserContext from 'context/User'

test('Render required login message if not logged in', () => {
  const { getByText } = render(<RequiredLogin />)
  expect(getByText('로그인이 필요한 페이지입니다.')).toBeInTheDocument()
})

test('Not render required login message if logged in', () => {
  const { queryAllByText } = render(
    <UserContext.Provider
      value={{ isLoggedIn: true, user: {}, toggleUser: jest.fn }}
    >
      <RequiredLogin />
    </UserContext.Provider>
  )
  expect(queryAllByText('로그인이 필요한 페이지입니다.').length).toBe(0)
})
