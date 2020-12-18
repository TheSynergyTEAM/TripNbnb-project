import MapContext from 'context/Map'
import Marker from 'context/Marker'
import { useCallback, useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'

interface MouseOverComponentProps {
  [key: string]: any
}

const OverlayContainer: React.FC = () => {
  return <div>Overlay Container</div>
}

const MouseOver: React.FC<MouseOverComponentProps> = (props) => {
  const { marker } = useContext(Marker)
  const { map } = useContext(MapContext)
  const [ctmOverlay, setCTMOverlay] = useState<any>(null)

  useEffect(() => {
    console.log('marker 생성')

    const overlay = new daum.maps.CustomOverlay({
      position: marker.getPosition(),
      content: renderToString(<OverlayContainer />),
      yAnchor: 0.7,
      zIndex: 50
    })

    console.log(overlay)

    // @: TODO
    overlay.setMap(map as daum.maps.Map)
    setCTMOverlay(overlay)

    return () => {
      console.log('marker 삭제')
      setCTMOverlay(null)
    }
  }, [marker, map])

  return (
    <div
      style={{
        display: 'fixed',
        width: '100%',
        height: '100vh',
        top: '0',
        left: '0',
        backgroundColor: 'blue',
        zIndex: 90
      }}
    >
      {marker.toString()}
    </div>
  )
}

export default MouseOver
