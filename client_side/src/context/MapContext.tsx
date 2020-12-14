import { Context, createContext } from 'react'

interface MapContextType {
  map?: daum.maps.Map | null
  places?: daum.maps.services.Places | null
}

const initialMapContextValue: MapContextType = {
  map: null,
  places: null
}

const MapContext: Context<MapContextType> = createContext(
  initialMapContextValue
)

export default MapContext
