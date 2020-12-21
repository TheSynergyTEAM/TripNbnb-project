import styled from 'styled-components'
import SearchBox from './search/Box'
import OverlayContainer from 'components/map/overlay/Container'
import Marker from 'context/Marker'
import { useCallback, useState } from 'react'

const StyledMap = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container: React.FC = () => {
  const [marker, setMarker] = useState(null)
  const [markerPlace, setMarkerPlace] = useState(null)

  const onChangeMarker = useCallback(() => {
    return marker || null
  }, [marker])

  return (
    <StyledMap id="map">
      <Marker.Provider
        value={{ marker, setMarker, markerPlace, setMarkerPlace }}
      >
        <SearchBox />
        {onChangeMarker() && <OverlayContainer />}
      </Marker.Provider>
    </StyledMap>
  )
}

export default Container
