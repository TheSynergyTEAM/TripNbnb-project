import axios from 'axios'
import MarkerContext from 'context/Marker'
import { useEffect, useContext } from 'react'

export const useFetchPlaceData = (setStateFn: Function) => {
  const { detailItem } = useContext(MarkerContext)

  useEffect(() => {
    if (detailItem?.id) {
      console.log(detailItem.id)
      const fetchPlace = async () => {
        const placeData = await axios.get(
          // `/places/${detailItem?.id}`
          // `/places/1`
          `http://localhost:7999/places/${detailItem?.id}/`
        )
        console.log(placeData)
        setStateFn(placeData.data)
      }

      fetchPlace()
    }

    return () => {
      setStateFn(null)
    }
  }, [setStateFn, detailItem])
}
