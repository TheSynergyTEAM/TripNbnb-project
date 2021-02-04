import { SearchState } from 'pages/Search'
import React from 'react'

export default React.createContext<SearchState>({
  resultItem: [],
  setSearchResult: (e, k) => {},
  keyword: ''
})
