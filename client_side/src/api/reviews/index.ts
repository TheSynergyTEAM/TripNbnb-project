import axios from 'axios'
import type { User } from 'context/User'

export async function writeReview(user: User, content: any) {
  try {
    await axios.post('/reviews/', { user, content })
  } catch (error) {
    throw new Error(error)
  }
}

export async function updateReview(user: User, content: any) {}

export async function deleteReivew(user: User, review: any) {}

export async function getReviews(placeId: number | string) {}
