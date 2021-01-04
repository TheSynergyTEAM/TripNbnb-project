import axios from 'axios'
import { PlaceData } from 'components/map/hooks/FetchPlace'
import type { User } from 'context/User'

export async function writeReview(
  user: User,
  content: any
): Promise<PlaceData> {
  try {
    const { data: updatedPlaceData } = await axios.post('/reviews/', {
      user,
      content
    })
    return updatedPlaceData
  } catch (error) {
    throw new Error(error)
  }
}

export async function updateReview(user: User, content: any) {}

export async function deleteReivew(user: User, review: any) {}

export async function getReviews(placeId: number | string) {}
