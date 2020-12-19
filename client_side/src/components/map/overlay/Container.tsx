import MapContext from 'context/Map'
import Marker from 'context/Marker'
import { useContext, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import { Spin } from 'antd'
import styled from 'styled-components'

/* overlay test */

const OverlayLoadingIndicator: React.FC<any> = () => {
  return (
    <div className="overlay-loading-indicator">
      <Spin />
    </div>
  )
}

const ContentWrapper = styled.div`
  width: 100px;
  height: 100px;
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: black;
`

const OverlayContentAfterLoadedData: React.FC = () => {
  return <ContentWrapper>Example Data!</ContentWrapper>
}

/* overlay test */

const Container: React.FC = (props) => {
  const { marker } = useContext(Marker)
  const { map } = useContext(MapContext)

  useEffect(() => {
    // 오버레이 생성
    const overlay = new daum.maps.CustomOverlay({
      position: marker.getPosition(),
      yAnchor: 0,
      zIndex: 50
    })
    // 컨텐츠 렌더링
    const content = renderToString(
      <OverlayLoadingIndicator overlay={overlay} />
    )
    // 오버레이에 렌더링 된 HTML 삽입
    overlay.setContent(content)
    // 맵에 표시
    overlay.setMap(map as daum.maps.Map)
    // 데이터 로드되고 난 뒤 컨텐츠 바꾸기 (TEST)
    window.setTimeout(() => {
      const loadedDataContent = renderToString(
        <OverlayContentAfterLoadedData />
      )
      overlay.setContent(loadedDataContent)
    }, 1500)

    return () => {
      // 마커 마우스 이벤트(mouseout) 발생 시 맵에 표시된 오버레이 제거
      overlay.setMap(null)
    }
  }, [marker, map])

  return null
}

export default Container
