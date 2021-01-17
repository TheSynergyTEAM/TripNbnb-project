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

export function useFetchUser(): [FetchUser | null, boolean] {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<FetchUser | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }

    ;(async function () {
      setUser(await fetchUserById(id))
      setLoading(false)
    })()

    return () => {
      setUser(null)
      setLoading(true)
    }
  }, [id])

  return [user, loading]
}

export type { FetchReview, FetchUser }
