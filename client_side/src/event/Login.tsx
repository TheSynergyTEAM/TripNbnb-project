import User from 'context/User'
import { useContext, useEffect } from 'react'
import axios from 'axios'

interface AuthResult {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

const Login: React.FC = () => {
  const { toggleUser } = useContext(User)

  useEffect(() => {
    // Init auth if not initialized
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
    }

    window.Kakao.Auth.login({
      success: (authObj: AuthResult) => {
        window.Kakao.Auth.setAccessToken(authObj.access_token)
        // Fetch user information
        window.Kakao.API.request({ url: '/v2/user/me' })
          .then((user: any) => {
            toggleUser(user)
            // No any response
            axios.post('/users/login', user)
          })
          .catch((error: any) => console.error(error))
      },
      fail: (reason: any) => reason
    })
    // eslint-disable-next-line
  }, [])

  return null
}

export default Login
