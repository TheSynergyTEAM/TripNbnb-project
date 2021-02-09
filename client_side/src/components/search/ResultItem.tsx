import { List } from 'antd'
import { fetchPlaceThumbnailDataTest } from 'components/map/hooks/FetchPlace'
import { Component } from 'react'

interface ResultItemState {
  loaded: boolean
  data: any
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
      loaded: false,
      data: null
    }
  }

  componentDidMount() {
    fetchPlaceThumbnailDataTest(
      this.props.place.id,
      this.props.place.place_name
    )
      .then((result) => {
        this.setState({ data: result, loaded: true })
        this.props.load()
      })
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
