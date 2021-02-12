import { Row, Col } from 'antd'
import { PlaceThumbnailData } from 'components/map/hooks/FetchPlace'
import { Column } from 'components/search/Bar'
import Header from 'components/search/detail/Header'
import SearchDetailContext from 'context/SearchDetail'
import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import 'styles/search-page.css'

export interface SearchDetailState {
  place: PlaceThumbnailData | null
}

const Container = styled.section`
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
`

const { Provider } = SearchDetailContext

export default class SearchDetail extends Component<
  RouteComponentProps,
  SearchDetailState
> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      place: this.props.location.state as PlaceThumbnailData
    }
  }

  componentDidMount() {
    if (!this.state.place) {
      console.log('not loaded place data')
    } else {
      console.log(this.state.place)
    }
  }

  componentWillUnmount() {
    this.setState({ place: null })
  }

  render() {
    return (
      <Row justify="center">
        <Col {...Column}>
          <Container>
            <Provider value={{ ...this.state }}>
              <Header />
            </Provider>
          </Container>
        </Col>
      </Row>
    )
  }
}
