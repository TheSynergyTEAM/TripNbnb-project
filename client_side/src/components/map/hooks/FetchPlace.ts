import axios, { AxiosResponse } from 'axios'
import MarkerContext from 'context/Marker'
import { useEffect, useContext, useState } from 'react'

interface ReviewData {
  created: string
  rating: number
  review: string
  username: string
  date: number
  content: string
  user_id: string
  user_profile?: string
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

export const useFetchPlaceData = (): PlaceData | null => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null)
  const { detailItem } = useContext(MarkerContext)

  useEffect(() => {
    if (detailItem?.id) {
      const fetchPlace = async () => {
        const placeData: AxiosResponse<PlaceData> = await axios.get(
          `/places/${detailItem?.id}/?name=${detailItem?.place_name}`
        )
        // add meta properties
        placeData.data.data = placeData.data.data.map((d) => ({
          ...d,
          date: new Date(d.created).getTime(),
          content: d.review
        }))
        setPlaceData(placeData.data)
      }

      fetchPlace()
    }

    return () => {
      setPlaceData(null)
    }
  }, [detailItem])

  return placeData
}

export type { ReviewData, PlaceData }
