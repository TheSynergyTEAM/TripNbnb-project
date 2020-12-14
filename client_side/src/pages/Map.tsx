import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'
import SearchBox from 'components/map/SearchBox'
import { useEffect, useState } from 'react'
import MapContext from 'context/MapContext'

const Map: React.FC<RouteComponentProps> = () => {
  const [map, setMap] = useState(null)
  const [places, setPlaces] = useState(null)

  useEffect(() => {
    const mapContainer = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(33.234567, 126.232323),
      level: 5
    }
    const __places__ = new window.kakao.maps.services.Places()
    const __map__ = new window.kakao.maps.Map(mapContainer, options)

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
