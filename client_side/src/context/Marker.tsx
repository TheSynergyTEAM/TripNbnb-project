import { Context, createContext } from 'react'

interface MarkerContext {
  marker: any
  markerPlace: ResultItem | null
  setMarker: (marker: any) => void
  setMarkerPlace: (markerPlace: ResultItem | any) => void
}

const initialMarker: MarkerContext = {
  marker: null,
  markerPlace: null,
  setMarker: () => {},
  setMarkerPlace: (markerPlace: ResultItem | null) => {}
}

const Marker: Context<MarkerContext> = createContext(initialMarker)

export type { MarkerContext }
export default Marker
