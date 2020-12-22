import MapContext from 'context/Map'
import MarkerContext from 'context/Marker'
import { useContext, useEffect } from 'react'

const TileLoadedEvent: React.FC = () => {
  const { map } = useContext(MapContext)
  const { visibleDetail, setVisibleDetail, setDetailItem } = useContext(
    MarkerContext
  )

  useEffect(() => {
    daum.maps.event.addListener(
      map as daum.maps.Map,
      'dragend',
      handleTileLoadEvent
    )

    function handleTileLoadEvent() {
      if (visibleDetail) {
        setVisibleDetail(false)
        setDetailItem(null)
      }
    }
  })

  return null
}

export default TileLoadedEvent
