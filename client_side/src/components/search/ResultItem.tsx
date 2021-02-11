import { Image, List, Rate } from 'antd'
import type { PlaceThumbnailData } from 'components/map/hooks/FetchPlace'
import { Component } from 'react'
import { Link } from 'react-router-dom'

interface ResultItemState {
  loaded: boolean
  data: any
}

interface ResultItemProps {
  place: PlaceThumbnailData
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
      <Link
        to={{
          pathname: `/search/${this.props.place.id}`,
          state: {
            ...this.props.place
          }
        }}
      >
        <List.Item>
          <List.Item.Meta
            avatar={
              <Image src={this.props.place.image} preview={false} width={160} />
            }
            title={this.props.place.place_name}
            description={
              <>
                <div>{this.props.place.address_name}</div>
                <div>
                  <Rate value={this.props.place.review} disabled />
                </div>
              </>
            }
          />
        </List.Item>
      </Link>
    )
  }
}
