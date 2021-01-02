import axios, { AxiosResponse } from 'axios'
import MarkerContext from 'context/Marker'
import { useEffect, useContext } from 'react'

interface ReviewData {
  created: string
  rating: number
  review: string
  username: string
  date: number
  content: string
}

interface PlaceData {
  data: Array<ReviewData>
  images: Array<string>
}

export const useFetchPlaceData = (setStateFn: Function) => {
  const { detailItem } = useContext(MarkerContext)

  useEffect(() => {
    if (detailItem?.id) {
      console.log(detailItem.id)
      const fetchPlace = async () => {
        const placeData: AxiosResponse<PlaceData> = await axios.get(
          `/places/${detailItem?.id}/?name=${detailItem?.place_name}`
          // `/places/1`
          // `http://localhost:7999/places/${detailItem?.id}/`
        )
        // date
        placeData.data.data = placeData.data.data.map((d) => ({
          ...d,
          date: new Date(d.created).getTime(),
          content: d.review
        }))
        setStateFn(placeData.data)
      }

      fetchPlace()
    }

    return () => {
      setStateFn(null)
    }
  }, [setStateFn, detailItem])
}

export type { ReviewData, PlaceData }
