import Marker from 'context/Marker'
import { useContext, useEffect } from 'react'

interface MouseOverComponentProps {
  [key: string]: any
}

const MouseOver: React.FC<MouseOverComponentProps> = (props) => {
  const { marker } = useContext(Marker)

  useEffect(() => {
    console.log('marker 생성')

    return () => {
      console.log('marker 삭제')
    }
  }, [marker])

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
