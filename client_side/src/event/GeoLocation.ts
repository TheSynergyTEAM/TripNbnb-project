import { useEffect, useState } from 'react'

export default function useGeoLocation(map: daum.maps.Map | null) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (map && !loaded) {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const position = new daum.maps.LatLng(
            success.coords.latitude,
            success.coords.longitude
          )
          map.setCenter(position)
          setLoaded(true)
        },
        () => {},
        { enableHighAccuracy: true }
      )
    }
  }, [map, loaded])
}
