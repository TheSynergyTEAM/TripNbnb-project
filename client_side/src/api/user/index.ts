import axios from 'axios'
import { FetchUser } from 'components/user/hooks/user-hooks'

export async function fetchUserById(
  id: string | number
): Promise<FetchUser | null> {
  try {
    const { data: user } = await axios.get(`/users/${id}`)
    console.log(user)
    return user
  } catch (error) {
    return null
  }
}
