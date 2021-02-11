import { createContext } from 'react'
import type { SearchDetailState } from 'pages/SearchDetail'

const SearchDetailContext = createContext<SearchDetailState>({ place: null })

export default SearchDetailContext
