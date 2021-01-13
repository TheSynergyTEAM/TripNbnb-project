import axios from 'axios'
import { PlaceData, ReviewData } from 'components/map/hooks/FetchPlace'
import type { User } from 'context/User'

export async function writeReview(
  user: User,
  content: any
): Promise<PlaceData> {
  try {
    const { data: updatedPlaceData } = await axios.post('/reviews/create/', {
      user,
      content
    })
    return updatedPlaceData
  } catch (error) {
    throw new Error(error)
  }
}

export async function updateReview(
  user: User,
  content: string,
  review: ReviewData
) {
  if (!user) {
    throw new Error('Not logged in')
  }

  try {
    await axios.post('/reviews/update/', {
      review_id: review.review_id,
      content
    })
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteReivew(user: User, review: ReviewData) {
  if (!user) return

  try {
    await axios.delete(`/reviews/delete/${review.review_id}`)
  } catch (error) {
    throw new Error(error)
  }
}

export async function getReviews(placeId: number | string) {}
