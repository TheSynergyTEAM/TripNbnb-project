import axios, { AxiosResponse } from 'axios'
import MarkerContext from 'context/Marker'
import { useEffect, useContext, useState } from 'react'

interface ReviewData {
  content: string
  created: string
  date: number
  rating: number
  review_id: number
  review: string
  user_id: string
  user_profile?: string
  username: string
}

interface PlaceMeta {
  rating: number | string
  reviewCount: number
}

interface PlaceData {
  data: Array<ReviewData>
  images: Array<string>
  meta?: PlaceMeta
}

export const fetchPlaceThumbnailData = async (
  placeId: string | number | undefined,
  placeName: string | undefined
): Promise<PlaceData> => {
  try {
    if (!placeId || !placeName) {
      throw new Error('아이디 값 혹은 장소 이름 누락')
    }

    const placeData: AxiosResponse<PlaceData> = await axios.get(
      `/places/${placeId}/?name=${placeName}`
    )

    let rating = 0
    const reviewCount = placeData.data.data.length

    placeData.data.data.forEach((review) => {
      rating += review.rating
    })

    placeData.data.meta = {
      rating: (rating / reviewCount).toFixed(1),
      reviewCount
    }

    return placeData.data
  } catch (error) {
    throw error
  }
}

export function addMetaReviews(placeData: PlaceData | ReviewData[]) {
  let target = null

  if (Array.isArray(placeData)) {
    target = placeData
  } else {
    target = placeData.data
  }
  return target.map((r) => ({
    ...r,
    date: new Date(r.created).getTime(),
    content: r.review
  }))
}

export const useFetchPlaceData = (): [
  PlaceData | null,
  ReviewData[],
  Function,
  Array<string> | []
] => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null)
  const [reviews, setReviews] = useState<Array<ReviewData>>([])
  const [images, setImages] = useState<Array<string>>([])
  const { detailItem } = useContext(MarkerContext)
  const setReviewsWrapper = (_reviews: Array<ReviewData>) => {
    setReviews(addMetaReviews(_reviews))
  }

  const addImage = (i: string) => {
    setImages((im) => [...im, i])
  }

  useEffect(() => {
    if (detailItem?.id) {
      const fetchPlace = async () => {
        const receivedPlaceData: AxiosResponse<PlaceData> = await axios.get(
          `/places/${detailItem?.id}/?name=${detailItem?.place_name}`
        )
        receivedPlaceData.data.data = addMetaReviews(receivedPlaceData.data)
        receivedPlaceData.data.images.forEach((img) => {
          const el = new Image()

          el.onload = function () {
            addImage(img)
          }

          el.src = img
        })
        setPlaceData(receivedPlaceData.data)
        setReviews(receivedPlaceData.data.data)
      }

      fetchPlace()
    }

    return () => {
      setPlaceData(null)
      setReviews([])
    }
  }, [detailItem])

  return [placeData, reviews, setReviewsWrapper, images]
}

export type { ReviewData, PlaceData }
