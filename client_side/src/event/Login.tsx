import User from 'context/User'
import { useContext, useEffect } from 'react'
import axios from 'axios'

interface LoginComponentProps {
  popup: boolean
}

interface AuthResult {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

const Login: React.FC<LoginComponentProps> = ({ popup }) => {
  const { toggleUser } = useContext(User)

  useEffect(() => {
    // Init auth if not initialized
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
    }

    const autoLogin = async () => {
      try {
        const user = window.Kakao.API.request({ url: '/v2/user/me' })
        toggleUser(user)
      } catch (error) {
        throw error
      }
    }

    if (window.Kakao.Auth.getAccessToken()) {
      autoLogin()
    } else {
      if (popup) {
        window.Kakao.Auth.login({
          success: (authObj: AuthResult) => {
            window.Kakao.Auth.setAccessToken(authObj.access_token)
            autoLogin()
          },
          fail: (reason: any) => console.error(reason)
        })
      }
    }

    // const autoLogin = () => {
    //   window.Kakao.API.request({ url: '/v2/user/me' })
    //     .then((user: any) => {
    //       toggleUser(user)
    //       // No effect
    //       axios.post('/users/login', user)
    //     })
    //     .catch((error: any) => {
    //       if (popup) {
    //         window.Kakao.Auth.login({
    //           success: (authObj: AuthResult) => {
    //             window.Kakao.Auth.setAccessToken(authObj.access_token)
    //             autoLogin()
    //           },
    //           fail: (reason: any) => console.error(reason)
    //         })
    //       }
    //     })
    // }

    // autoLogin()
  }, [toggleUser, popup])

  return null
}

export default Login
