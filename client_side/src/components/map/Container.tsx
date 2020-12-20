import styled from 'styled-components'
import SearchBox from './search/Box'
import OverlayContainer from 'components/map/overlay/Container'
import Marker from 'context/Marker'
import { useCallback, useState } from 'react'
import Content from './overlay/Content'

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
        <Content
          style={{ position: 'fixed', top: '25px', left: '25px', zIndex: 500 }}
          loading={true}
        />
        <Content
          style={{ position: 'fixed', top: '25px', right: '25px', zIndex: 500 }}
          loading={false}
        />
        {onChangeMarker() && <OverlayContainer />}
      </Marker.Provider>
    </StyledMap>
  )
}

export default Container
