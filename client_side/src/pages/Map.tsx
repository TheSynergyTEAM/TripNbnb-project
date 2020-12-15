import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'
import SearchBox from 'components/map/search/Box'
import { useEffect, useState } from 'react'
import MapContext from 'context/MapContext'

const Map: React.FC<RouteComponentProps> = () => {
  const [map, setMap] = useState<daum.maps.Map | null>(null)
  const [places, setPlaces] = useState<daum.maps.services.Places | null>(null)

  useEffect(() => {
    const mapContainer = document.getElementById('map')
    const options = {
      center: new daum.maps.LatLng(33.234567, 126.232323),
      level: 5
    }
    const __places__ = new daum.maps.services.Places()
    const __map__ = new daum.maps.Map(mapContainer as HTMLElement, options)

    setMap(__map__)
    setPlaces(__places__)

    return () => {
      setMap(null)
      setPlaces(null)
    }
  }, [])

  return (
    <div className="page-map">
      <MapContext.Provider value={{ map, places }}>
        <SearchBox />
        <MapContainer />
      </MapContext.Provider>
    </div>
  )
}

export default Map
