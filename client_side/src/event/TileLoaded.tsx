import MapContext from 'context/MapContext'
import { useContext, useEffect } from 'react'

const IdleEvent: React.FC = () => {
  const { map, places } = useContext(MapContext)

  useEffect(() => {
    daum.maps.event.addListener(map as daum.maps.Map, 'tilesloaded', () => {
      places?.categorySearch(
        // @ts-ignore
        'AT4',
        (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            console.log(result)
          }
        },
        {
          location: map?.getCenter()
        }
      )
    })
  })

  return <div />
}

export default IdleEvent
