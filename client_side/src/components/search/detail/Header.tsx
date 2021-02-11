import SearchDetailContext from 'context/SearchDetail'
import { Component } from 'react'

const { Consumer } = SearchDetailContext

export default class SearchDetailHeader extends Component {
  render() {
    return (
      <Consumer>
        {({ place }) => place && <div>{place.address_name}</div>}
      </Consumer>
    )
  }
}
