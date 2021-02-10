import { List } from 'antd'
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

  render() {
    return (
      <List.Item title="12">
        <List.Item.Meta />
      </List.Item>
    )
  }
}
