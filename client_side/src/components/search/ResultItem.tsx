import { Image, List, Rate, Skeleton } from 'antd'
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

const FallbackImage = () => (
  <Skeleton.Button active style={{ width: '160px', height: '160px' }} />
)

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
    const image = new window.Image()

    image.src = this.props.place.image
    image.onload = () => {
      this.setState({ loaded: true })
      this.props.load()
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
              this.state.loaded ? (
                <Image
                  src={this.props.place.image}
                  preview={false}
                  width={160}
                />
              ) : (
                <FallbackImage />
              )
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
