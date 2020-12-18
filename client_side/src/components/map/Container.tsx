import styled from 'styled-components'
import SearchBox from './search/Box'
import Overlay from 'components/map/overlay/MouseOver'
import Marker from 'context/Marker'
import { useCallback, useState } from 'react'

const StyledMap = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container: React.FC = () => {
  const [marker, setMarker] = useState(null)

  const onChangeMarker = useCallback(() => {
    return marker || null
  }, [marker])

  return (
    <StyledMap id="map">
      <Marker.Provider value={{ marker, setMarker }}>
        <SearchBox />
        {onChangeMarker() && <Overlay />}
      </Marker.Provider>
    </StyledMap>
  )
}

export default Container
