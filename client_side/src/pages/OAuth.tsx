import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface AuthResult {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

const OAuth = () => {
  const [fail, setFail] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const code = location.search.split('code=')[1]

    if (!code) {
      setFail(true)
    } else {
      // init
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
      }

      window.Kakao.Auth.login({
        success: (authObj: AuthResult) => {
          window.Kakao.Auth.setAccessToken(authObj.access_token)
        },
        fail: (reason: any) => {
          console.log(reason)
        }
      })
    }
  }, [location.search])

  return fail ? <div>OAuth Login Fail</div> : <div>OAuth Checking....</div>
}

export default OAuth
