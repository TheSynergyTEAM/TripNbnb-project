import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'
import { useEffect, useState } from 'react'
import MapContext from 'context/Map'
import styled from 'styled-components'

const StyledMap = styled.div`
  overflow: hidden;
`

const Map: React.FC<RouteComponentProps> = () => {
  const [map, setMap] = useState<daum.maps.Map | null>(null)
  const [places, setPlaces] = useState<daum.maps.services.Places | null>(null)

  useEffect(() => {
    // fixed body height
    document.body.classList.add('body-fixed-height')

    const mapContainer = document.getElementById('map')
    const options = {
      center: new daum.maps.LatLng(37.5326, 127.024612),
      level: 5
    }
    const __places__ = new daum.maps.services.Places()
    const __map__ = new daum.maps.Map(mapContainer as HTMLElement, options)

    setMap(__map__)
    setPlaces(__places__)

    return () => {
      setMap(null)
      setPlaces(null)

      // disabled fixed body height
      if (document.body.classList.contains('body-fixed-height')) {
        document.body.classList.remove('body-fixed-height')
      }
    }
  }, [])

  return (
    <StyledMap>
      <MapContext.Provider value={{ map, places }}>
        <MapContainer />
      </MapContext.Provider>
    </StyledMap>
  )
}

export default Map
