import { User } from 'context/User'

function fetchUserById(id: string | number): Promise<User> {
  // test
  return new Promise((resolve, reject) => {
    window.setTimeout(() => resolve({ id: parseInt(id.toString()) }), 1000)
  })
}

export { fetchUserById }
