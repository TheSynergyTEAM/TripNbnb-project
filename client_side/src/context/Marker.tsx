import { Context, createContext } from 'react'

type ResultItem = daum.maps.services.PlacesSearchResultItem | null

interface MarkerContext {
  marker: any
  markerPlace: ResultItem
  setMarker: (marker: any) => void
  setMarkerPlace: (markerPlace: ResultItem | any) => void
}

const initialMarker: MarkerContext = {
  marker: null,
  markerPlace: null,
  setMarker: () => {},
  setMarkerPlace: (markerPlace: ResultItem | any) => {}
}

const Marker: Context<MarkerContext> = createContext(initialMarker)

export type { MarkerContext }
export default Marker
