import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledMap = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container: React.FC = () => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const mapContainer = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(33.234567, 126.232323),
      level: 5
    }

    setMap(new window.kakao.maps.Map(mapContainer, options))

    return () => {
      setMap(null)
    }
  }, [])

  return <StyledMap id="map"></StyledMap>
}

export default Container
