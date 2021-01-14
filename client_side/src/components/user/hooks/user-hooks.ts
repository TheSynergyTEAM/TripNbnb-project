import { fetchUserById } from 'api/user'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface FetchReview {
  place: string
  review: string
}

interface FetchUser {
  user_biography: string
  user_profile: string
  user_reviews: FetchReview[]
  username: string
}

export function useFetchUser() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<FetchUser | null>(null)

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

export type { FetchReview, FetchUser }
