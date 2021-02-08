import { List } from 'antd'
import { fetchPlaceThumbnailData } from 'components/map/hooks/FetchPlace'
import { Component } from 'react'

interface ResultItemState {
  loaded: boolean
}

interface ResultItemProps {
  place: daum.maps.services.PlacesSearchResultItem
  load: Function
}

export default class ResultItem extends Component<
  ResultItemProps,
  ResultItemState
> {
  constructor(props: ResultItemProps) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    fetchPlaceThumbnailData(this.props.place.id, this.props.place.place_name)
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
  }

  render() {
    return (
      <List.Item>
        <List.Item.Meta />
      </List.Item>
    )
  }
}
