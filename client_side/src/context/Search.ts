import { SearchState } from 'pages/Search'
import React from 'react'

export default React.createContext<SearchState>({
  resultItem: [],
  sortedResultItem: [],
  keyword: '',
  pagination: null,
  loading: false,
  setSearchResult: (e, k) => {},
  setSortedResultItem: (e) => {},
  setPagination: (e) => {},
  setLoading: (e) => {}
})
