import { Context, createContext } from 'react'

interface MapContextType {
  map?: any
}

const initialMapContextValue: MapContextType = {
  map: null
}

const MapContext: Context<MapContextType> = createContext(
  initialMapContextValue
)

export default MapContext
