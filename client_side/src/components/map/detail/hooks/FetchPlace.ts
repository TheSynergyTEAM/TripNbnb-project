import axios from 'axios'
import MarkerContext from 'context/Marker'
import { useEffect, useContext } from 'react'

export const useFetchPlaceData = (setStateFn: Function) => {
  const { detailItem } = useContext(MarkerContext)

  useEffect(() => {
    const fetchPlace = async () => {
      const placeData = await axios.get(`/places/${detailItem?.id}`)
      setStateFn(placeData.data)
    }

    fetchPlace()

    return () => {
      setStateFn(null)
    }
  }, [setStateFn, detailItem])
}
