import { fetchUserById, fetchPlaceLists } from 'api/user'
import { PlaceList } from 'context/User'
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

export function usePlaceList(): [boolean, Array<PlaceList>, Function] {
  const [loading, setLoading] = useState(true)
  const [placeList, setPlaceList] = useState<Array<PlaceList>>([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!id) {
      return
    }

    ;(async function () {
      setPlaceList(await fetchPlaceLists(id))
      setLoading(false)
    })()

    return () => {
      setPlaceList([])
      setLoading(true)
    }
  }, [id])

  return [loading, placeList, setPlaceList]
}

export type { FetchReview, FetchUser }
