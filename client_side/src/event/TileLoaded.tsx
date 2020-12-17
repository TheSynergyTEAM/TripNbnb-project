import MapContext from 'context/Map'
import { useContext, useEffect } from 'react'

const IdleEvent: React.FC = () => {
  const { map, places } = useContext(MapContext)

  useEffect(() => {
    // daum.maps.event.addListener(map as daum.maps.Map, 'tilesloaded', () => {
    //   places?.categorySearch(
    //     // @ts-ignore
    //     'AT4',
    //     (result, status) => {
    //       if (status === daum.maps.services.Status.OK) {
    //         result.forEach((item) => {
    //           const marker = new daum.maps.Marker({
    //             map: map as daum.maps.Map,
    //             position: new daum.maps.LatLng(
    //               parseFloat(item.y),
    //               parseFloat(item.x)
    //             )
    //           })
    //           marker.setMap(map as daum.maps.Map)
    //         })
    //       }
    //     },
    //     {
    //       location: map?.getCenter()
    //     }
    //   )
    // })
  })

  return <div />
}

export default IdleEvent
