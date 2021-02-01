import SearchBar from 'components/search/Bar'
import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

const SearchContainer = styled.section`
  background-color: #eee;
  min-height: 99vh;
`

export default class Search extends Component<RouteComponentProps> {
  render() {
    return (
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
    )
  }
}
