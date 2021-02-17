import { createContext } from 'react'
import type { SearchDetailState, SerachDetailAction } from 'pages/SearchDetail'

const SearchDetailContext = createContext<
  SearchDetailState & SerachDetailAction
>({
  place: null,
  customPlace: null,
  originPlace: null,
  setPlaceList: (a) => {}
})

export default SearchDetailContext
