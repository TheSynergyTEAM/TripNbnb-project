import SearchBar from 'components/search/Bar'
import Result from 'components/search/Result'
import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SearchContext from 'context/Search'
import styled from 'styled-components'

type ResultItem = daum.maps.services.PlacesSearchResultItem
type Pagination = daum.maps.Pagination

export type SearchState = {
  resultItem: ResultItem[] | []
  keyword: string
  pagination: Pagination | null
  loading: boolean
  setSearchResult: (t: ResultItem[] | [], k: string) => void
  setPagination: (pagination: Pagination | null) => void
  setLoading: (s: boolean) => void
}

const SearchContainer = styled.section`
  background-color: #eee;
  min-height: 150vh; // test for search bar sticky
`

const { Provider: SearchProvider } = SearchContext

export default class Search extends Component<
  RouteComponentProps,
  SearchState
> {
  // 결과 값이 반드시 있다고 보장해야 함
  setSearchResult = (searchResultItem: ResultItem[] | [], keyword: string) => {
    this.setState((state) => {
      return { ...state, resultItem: searchResultItem, keyword }
    })
  }

  setPagination = (pagination: Pagination | null) => {
    this.setState((state) => {
      return { ...state, pagination }
    })
  }

  setLoading = (loading: boolean) => this.setState({ loading })

  state: SearchState = {
    resultItem: [],
    keyword: '',
    pagination: null,
    loading: false,
    setSearchResult: this.setSearchResult,
    setPagination: this.setPagination,
    setLoading: this.setLoading
  }

  render() {
    return (
      <SearchContainer>
        <SearchProvider value={{ ...this.state }}>
          <SearchBar />
          <Result />
        </SearchProvider>
      </SearchContainer>
    )
  }
}
