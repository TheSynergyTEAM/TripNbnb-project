import ExtendTag from 'components/common/Tag'
import SearchDetailContext from 'context/SearchDetail'
import { Component } from 'react'

const { Consumer } = SearchDetailContext

export default class SearchDetailHeader extends Component<any, any> {
  render() {
    return (
      <Consumer>
        {({ place }) =>
          place && (
            <>
              <h2 style={{ fontWeight: 'bold' }}>{place.place_name}</h2>
              <>
                {place.category_name.split('>').map((category) => (
                  <ExtendTag key={category}>{category.trim()}</ExtendTag>
                ))}
              </>
            </>
          )
        }
      </Consumer>
    )
  }
}
