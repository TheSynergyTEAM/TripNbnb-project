import SearchBar from 'components/search/Bar'
import Result from 'components/search/Result'
import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SearchContext from 'context/Search'
import type { PlaceThumbnailData } from 'components/map/hooks/FetchPlace'

type Pagination = daum.maps.Pagination

export type SearchState = {
  resultItem: Array<PlaceThumbnailData> | []
  sortedResultItem: Array<PlaceThumbnailData>
  keyword: string
  pagination: Pagination | null
  loading: boolean
  setSearchResult: (t: PlaceThumbnailData[] | [], k: string) => void
  setSortedResultItem: (t: PlaceThumbnailData[]) => void
  setPagination: (pagination: Pagination | null) => void
  setLoading: (s: boolean) => void
}

const { Provider: SearchProvider } = SearchContext

export default class Search extends Component<
  RouteComponentProps,
  SearchState
> {
  // 결과 값이 반드시 있다고 보장해야 함
  setSearchResult = (
    searchResultItem: PlaceThumbnailData[] | [],
    keyword: string
  ) => {
    this.setState((state) => {
      return { resultItem: searchResultItem, keyword }
    })
  }

  setSortedResultItem = (resultItem: PlaceThumbnailData[]) => {
    this.setState((state) => ({ ...state, sortedResultItem: resultItem }))
  }

  setPagination = (pagination: Pagination | null) => {
    this.setState((state) => {
      return { pagination }
    })
  }

  setLoading = (loading: boolean) => this.setState({ loading })

  state: SearchState = {
    resultItem: [],
    sortedResultItem: [],
    keyword: '',
    pagination: null,
    loading: false,
    setSearchResult: this.setSearchResult,
    setSortedResultItem: this.setSortedResultItem,
    setPagination: this.setPagination,
    setLoading: this.setLoading
  }

  render() {
    return (
      <SearchProvider value={{ ...this.state }}>
        <SearchBar />
        <Result />
      </SearchProvider>
    )
  }
}
