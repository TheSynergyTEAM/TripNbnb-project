import axios from 'axios'
import { FetchUser } from 'components/user/hooks/user-hooks'
import { PlaceList } from 'context/User'

export async function fetchUserById(
  id: string | number
): Promise<FetchUser | null> {
  try {
    const { data: user } = await axios.get(`/users/${id}`)
    return user
  } catch (error) {
    return null
  }
}

export async function fetchPlaceLists(
  id: string | number | undefined
): Promise<Array<PlaceList> | []> {
  if (!id) return []

  try {
    const { data: placeLists } = await axios.get(`/lists/${id}/`)
    return placeLists.places
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function pushPlaceLists(
  userId: string | number,
  place: daum.maps.services.PlacesSearchResultItem
): Promise<boolean> {
  if (!userId || !place) {
    return false
  }

  try {
    const { data } = await axios.post('/lists/create/', {
      user_id: userId,
      content: {
        placeId: place.id,
        placeName: place.place_name,
        addressName: place.address_name,
        mapx: place.x,
        mapy: place.y
      }
    })

    return !!data
  } catch (error) {
    return false
  }
}
