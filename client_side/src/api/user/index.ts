import axios from 'axios'
import { User } from 'context/User'

export async function fetchUserById(id: string | number): Promise<User> {
  try {
    const { data: user } = await axios.get(`/users/${id}`)
    console.log(user)
    return user
  } catch (error) {
    throw error
  }
}
