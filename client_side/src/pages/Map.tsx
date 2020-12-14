import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'
import SearchBox from 'components/map/SearchBox'

const Map: React.FC<RouteComponentProps> = () => {
  return (
    <div className="page-map">
      <SearchBox />
      <MapContainer />
    </div>
  )
}

export default Map
