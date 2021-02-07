import { SearchState } from 'pages/Search'
import React from 'react'

export default React.createContext<SearchState>({
  resultItem: [],
  keyword: '',
  pagination: null,
  loading: false,
  setSearchResult: (e, k) => {},
  setPagination: (e) => {},
  setLoading: (e) => {}
})
