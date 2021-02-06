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
  setSearchResult: (t: ResultItem[] | [], k: string) => void
  keyword: string
  pagination: Pagination | null
  setPagination: (pagination: Pagination | null) => void
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

  state: SearchState = {
    resultItem: [],
    setSearchResult: this.setSearchResult,
    keyword: '',
    pagination: null,
    setPagination: this.setPagination
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
