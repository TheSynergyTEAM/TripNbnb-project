import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'
import SearchBox from 'components/map/SearchBox'
import { useEffect, useState } from 'react'
import MapContext from 'context/MapContext'

const Map: React.FC<RouteComponentProps> = () => {
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

  return (
    <div className="page-map">
      <MapContext.Provider value={{ map }}>
        <SearchBox />
        <MapContainer />
      </MapContext.Provider>
    </div>
  )
}

export default Map
