import { fetchUserById } from 'api/user'
import { User } from 'context/User'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function useFetchUser() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }

    ;(async function () {
      setUser(await fetchUserById(id))
    })()

    return () => {
      setUser(null)
    }
  }, [id])

  return [user]
}
