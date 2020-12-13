import { RouteComponentProps } from 'react-router-dom'
import MapContainer from 'components/map/Container'

const Map: React.FC<RouteComponentProps> = () => {
  return (
    <div className="page-map">
      <MapContainer />
    </div>
  )
}

export default Map
