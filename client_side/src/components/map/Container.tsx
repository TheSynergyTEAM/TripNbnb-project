import styled from 'styled-components'
import SearchBox from './search/Box'
import OverlayContainer from 'components/map/overlay/Container'
import DetailContainer from 'components/map/detail/Container'
import Marker from 'context/Marker'
import { useCallback, useState } from 'react'
import TileLoadedEvent from 'event/TileLoaded'

const StyledMap = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container: React.FC = () => {
  const [marker, setMarker] = useState(null)
  const [markerPlace, setMarkerPlace] = useState(null)
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [detailItem, setDetailItem] = useState(null)

  const onChangeMarker = useCallback(() => {
    return marker || null
  }, [marker])

  const getVisible = useCallback(() => visibleDetail || false, [visibleDetail])

  return (
    <StyledMap id="map">
      <Marker.Provider
        value={{
          marker,
          markerPlace,
          visibleDetail,
          detailItem,
          setMarker,
          setMarkerPlace,
          setVisibleDetail,
          setDetailItem
        }}
      >
        <SearchBox />
        {onChangeMarker() && <OverlayContainer />}
        {getVisible() && (
          <>
            <DetailContainer />
            <TileLoadedEvent />
          </>
        )}
      </Marker.Provider>
    </StyledMap>
  )
}

export default Container
