import { Button, Col, Row, Tooltip } from 'antd'
import ExtendTag from 'components/common/Tag'
import { SecondaryText } from 'components/common/typography'
import SearchDetailContext from 'context/SearchDetail'
import { Component } from 'react'
import PlaceCarousel from './Carousel'
import RiseOutlined from '@ant-design/icons/RiseOutlined'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const { Consumer } = SearchDetailContext

class SearchDetailHeader extends Component<RouteComponentProps, any> {
  handleMoveMap = (place: any) => {
    const { history } = this.props
    const categories = ['AT4', 'AD5', 'FD6']
    const type = categories.includes(place.category_group_code)

    history.push({
      pathname: '/map',
      search: `x=${place.x}&y=${place.y}&id=${place.id}${
        type ? '&type=true' : ''
      }`,
      state: place
    })
  }

  render() {
    return (
      <Consumer>
        {({ place }) =>
          place && (
            <>
              <Row justify="space-between">
                <Col sm={22} lg={23}>
                  <h2 style={{ fontWeight: 'bold', margin: 0 }}>
                    {place.place_name}
                  </h2>
                  <SecondaryText
                    style={{ display: 'block', marginBottom: '10px' }}
                  >
                    {place.address_name}
                  </SecondaryText>
                  {place.category_name.split('>').map((category) => (
                    <ExtendTag key={category}>{category.trim()}</ExtendTag>
                  ))}
                </Col>
                <Col sm={2} lg={1}>
                  <Tooltip title="지도에서 보기" placement="top" defaultVisible>
                    <Button
                      icon={<RiseOutlined />}
                      shape="circle"
                      type="default"
                      onClick={(e) => this.handleMoveMap(place)}
                    />
                  </Tooltip>
                </Col>
              </Row>
              <PlaceCarousel effect="fade" autoplay autoplaySpeed={3000} />
            </>
          )
        }
      </Consumer>
    )
  }
}

export default withRouter(SearchDetailHeader)
