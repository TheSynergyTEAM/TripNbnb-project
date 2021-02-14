import { categorySearch } from 'components/map/search/Function'
import { default as HOverlay } from 'components/map/search/HighlightOverlay'
import MapContext from 'context/Map'
import MarkerContext from 'context/Marker'
import { useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { useLocation } from 'react-router-dom'

function getQuery(search: string) {
  return new URLSearchParams(search)
}

function useMapCenter() {
  const [loaded, setLoaded] = useState(false)
  const markerContext = useContext(MarkerContext)
  const { map, places } = useContext(MapContext)
  const location = useLocation()

  useEffect(() => {
    if (map && !loaded) {
      if (!location.search) {
        // 사용자 위치 기반 맵 이동
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
      } else {
        // 쿼리 기반 맵 이동
        const query = getQuery(location.search)
        const lng = query.get('x')
        const lat = query.get('y')

        if (!lng || !lat) {
          return
        }

        const position = new daum.maps.LatLng(parseFloat(lat), parseFloat(lng))
        map.setCenter(position)
        setLoaded(true)

        // 맵이 아닌 곳에서 호출
        if (location.state && markerContext) {
          markerContext.setDetailItem(location.state)
          markerContext.setVisibleDetail(true)

          const content = renderToString(
            <HOverlay title={(location.state as any).place_name} />
          )

          const ho = new daum.maps.CustomOverlay({
            position,
            content,
            zIndex: 50,
            xAnchor: 0.55,
            yAnchor: 2
          })

          ho.setMap(map)
        }
      }
    }
  }, [map, loaded, location.search, location.state, markerContext])

  useEffect(() => {
    if (loaded && places && map) {
      categorySearch(null, markerContext, places, map)
    }
    // eslint-disable-next-line
  }, [loaded, places, map])
}

const MapCenter: React.FC = () => {
  useMapCenter()

  return null
}

export default MapCenter
