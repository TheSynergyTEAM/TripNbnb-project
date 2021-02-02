import SearchBar from 'components/search/Bar'
import Result from 'components/search/Result'
import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SearchContext from 'context/Search'
import styled from 'styled-components'

type ResultItem = daum.maps.services.PlacesSearchResultItem

export type SearchState = {
  resultItem: ResultItem[] | []
  setSearchResult: (t: ResultItem[] | []) => void
}

const SearchContainer = styled.section`
  background-color: #eee;
  min-height: 99vh;
`

const { Provider: SearchProvider } = SearchContext

export default class Search extends Component<
  RouteComponentProps,
  SearchState
> {
  // 결과 값이 반드시 있다고 보장해야 함
  setSearchResult = (searchResultItem: ResultItem[] | []) => {
    this.setState((state) => {
      return { ...state, resultItem: searchResultItem }
    })
  }

  state: SearchState = {
    resultItem: [],
    setSearchResult: this.setSearchResult
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
