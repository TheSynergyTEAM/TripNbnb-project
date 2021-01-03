import MapContext from 'context/Map'
import Marker from 'context/Marker'
import { useContext, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import Content from './Content'

const Container: React.FC = (props) => {
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

    // const fetchPlace = () => {
    //   return new Promise((resolve, reject) => {
    //     const fakeNumber = () => Math.floor(Math.random() * (100 - 1 + 1)) + 1

    //     axios
    //       .get(`http://localhost:7999/places/${fakeNumber()}`)
    //       .then((result) => resolve(result.data))
    //       .catch((error) => reject(error))
    //   })
    // }

    // // 데이터 로드 후 오버레이 표시
    // fetchPlace()
    //   .then((place: any) => {
    //     const loadedDataContent = renderToString(
    //       <Content
    //         rating={place.rating}
    //         reviewCount={place.review_count}
    //         loading={false}
    //         markerPlace={markerPlace}
    //       />
    //     )
    //     overlay.setContent(loadedDataContent)
    //   })
    //   .catch((error) => console.error(error))

    return () => {
      // 마커 마우스 이벤트(mouseout) 발생 시 맵에 표시된 오버레이 제거
      overlay.setMap(null)
    }
  }, [marker, map, markerPlace])

  return null
}

export default Container
