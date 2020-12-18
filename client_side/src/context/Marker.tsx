import { Context, createContext } from 'react'

interface MarkerContext {
  marker: any
  setMarker: (marker: any) => void
}

const initialMarker: MarkerContext = {
  marker: null,
  setMarker: () => {}
}

const Marker: Context<MarkerContext> = createContext(initialMarker)

export type { MarkerContext }
export default Marker
