import MapContext from 'context/Map'
import Marker from 'context/Marker'
import { useContext, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import { fetchPlaceThumbnailData } from '../hooks/FetchPlace'
import Content from './Content'

const Container: React.FC = () => {
  const { marker, markerPlace } = useContext(Marker)
  const { map } = useContext(MapContext)

  useEffect(() => {
    // 오버레이 생성
    const overlay = new daum.maps.CustomOverlay({
      position: marker.getPosition(),
      yAnchor: 0,
      zIndex: 50
    })
    // 컨텐츠 로더 표시
    const content = renderToString(<Content loading={true} />)
    overlay.setContent(content)
    overlay.setMap(map as daum.maps.Map)

    if (markerPlace?.id && markerPlace.place_name) {
      fetchPlaceThumbnailData(markerPlace?.id, markerPlace?.place_name)
        .then((placeData) => {
          const loadedDataContent = renderToString(
            <Content
              rating={placeData.meta?.rating}
              reviewCount={placeData?.meta?.reviewCount}
              loading={false}
              markerPlace={markerPlace}
              image={placeData.images[0]}
            />
          )
          overlay.setContent(loadedDataContent)
        })
        .catch((error) => console.error(error))
    }

    return () => {
      // 마커 마우스 이벤트(mouseout) 발생 시 맵에 표시된 오버레이 제거
      overlay.setMap(null)
    }
  })

  return null
}

export default Container
