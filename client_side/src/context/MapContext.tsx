import { Context, createContext } from 'react'

interface MapContextType {
  map?: any
  places?: any
}

const initialMapContextValue: MapContextType = {
  map: null,
  places: null
}

const MapContext: Context<MapContextType> = createContext(
  initialMapContextValue
)

export default MapContext
