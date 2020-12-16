import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'
import SearchBox from 'components/map/search/Box'
import { useEffect, useState } from 'react'
import MapContext from 'context/Map'
import TileLoadedEvent from 'event/TileLoaded'
import styled from 'styled-components'

const StyledMap = styled.div`
  overflow: hidden;
`

const Map: React.FC<RouteComponentProps> = () => {
  const [map, setMap] = useState<daum.maps.Map | null>(null)
  const [places, setPlaces] = useState<daum.maps.services.Places | null>(null)
  const [marker, setMarker] = useState<daum.maps.Marker | null>(null)

  useEffect(() => {
    // fixed body height
    document.body.classList.add('body-fixed-height')

    const mapContainer = document.getElementById('map')
    const options = {
      center: new daum.maps.LatLng(33.234567, 126.232323),
      level: 5
    }
    const __places__ = new daum.maps.services.Places()
    const __map__ = new daum.maps.Map(mapContainer as HTMLElement, options)
    const __marker__ = new daum.maps.Marker({
      map: __map__,
      position: new daum.maps.LatLng(32.2, 126.1)
    })

    setMap(__map__)
    setPlaces(__places__)
    setMarker(__marker__)

    return () => {
      setMap(null)
      setPlaces(null)
      setMarker(null)

      // disabled fixed body height
      if (document.body.classList.contains('body-fixed-height')) {
        document.body.classList.remove('body-fixed-height')
      }
    }
  }, [])

  return (
    <StyledMap>
      <MapContext.Provider value={{ map, places, marker }}>
        <SearchBox />
        <MapContainer />
        {map && <TileLoadedEvent />}
      </MapContext.Provider>
    </StyledMap>
  )
}

export default Map
