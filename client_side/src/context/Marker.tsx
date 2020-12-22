import { Context, createContext } from 'react'

interface MarkerContextType {
  marker: any
  markerPlace: ResultItem | null
  visibleDetail: boolean
  detailItem: ResultItem | null
  setMarker: (marker: any) => void
  setMarkerPlace: (markerPlace: ResultItem | any) => void
  setVisibleDetail: (visible: boolean) => void
  setDetailItem: (item: ResultItem | any) => void
}

const initialMarker: MarkerContextType = {
  marker: null,
  markerPlace: null,
  visibleDetail: false,
  detailItem: null,
  setMarker: () => {},
  setMarkerPlace: (markerPlace: ResultItem | null) => {},
  setVisibleDetail: (visible: boolean) => {},
  setDetailItem: (item: ResultItem | null) => {}
}

const MarkerContext: Context<MarkerContextType> = createContext(initialMarker)

export type { MarkerContextType }
export default MarkerContext
