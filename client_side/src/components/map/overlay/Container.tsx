import MapContext from 'context/Map'
import Marker from 'context/Marker'
import { useContext, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import { Spin, Rate } from 'antd'
import styled from 'styled-components'
import axios from 'axios'

/* overlay test */

const OverlayLoadingIndicator: React.FC<any> = () => {
  return (
    <ContentWrapper
      style={{ height: '150px', alignItems: 'center', width: '200px' }}
    >
      <Spin />
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: black;
  position: relative;
  bottom: 200px;
`

const ContentImage = styled.div`
  flex: 0 0 50%;
`

const ContentInformation = styled.div`
  flex: 0 0 50%;
  padding: 0.5rem 0.8rem;
`

const OverlayContentAfterLoadedData: React.FC<any> = ({ place }) => {
  return (
    <ContentWrapper className="shadow-box">
      <ContentImage>
        <img
          src="https://picsum.photos/150/150"
          alt="placeholder"
          width={150}
          height={150}
        />
      </ContentImage>
      <ContentInformation>
        <div>
          <Rate allowHalf disabled defaultValue={place.rating} />
        </div>
        <div>작성된 리뷰 {place.review_count}개</div>
      </ContentInformation>
    </ContentWrapper>
  )
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

    const fetchPlace = () => {
      return new Promise((resolve, reject) => {
        const fakeNumber = () => Math.floor(Math.random() * (100 - 1 + 1)) + 1

        axios
          .get(`/places/${fakeNumber()}`)
          .then((result) => resolve(result.data))
          .catch((error) => reject(error))
      })
    }

    // 데이터 로드 후 오버레이 표시
    fetchPlace()
      .then((place) => {
        const loadedDataContent = renderToString(
          <OverlayContentAfterLoadedData place={place} />
        )
        overlay.setContent(loadedDataContent)
      })
      .catch((error) => console.error(error))

    return () => {
      // 마커 마우스 이벤트(mouseout) 발생 시 맵에 표시된 오버레이 제거
      overlay.setMap(null)
    }
  }, [marker, map])

  return null
}

export default Container
