import { Row, Col } from 'antd'
import Reviews from 'components/map/detail/Reviews'
import {
  PlaceThumbnailData,
  PlaceData,
  fetchPlaceDataById
} from 'components/map/hooks/FetchPlace'
import { Column } from 'components/search/Bar'
import Header from 'components/search/detail/Header'
import SearchDetailContext from 'context/SearchDetail'
import { useEffect, useState } from 'react'
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import 'styles/search-page.css'

export interface SearchDetailState {
  place: PlaceThumbnailData | null
  customPlace: PlaceData<Array<string>> | null
  // customPlace: (PlaceThumbnailData & PlaceData) | null
}

const Container = styled.section`
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
`

const { Provider } = SearchDetailContext

const SearchDetail: React.FC<RouteComponentProps> = () => {
  const location = useLocation()
  const [placeState, setPlaceState] = useState<SearchDetailState>({
    customPlace: null,
    place: null
  })

  useEffect(() => {
    if (location.state) {
      fetchPlaceDataById(
        (location.state as any).id,
        (location.state as any).place_name
      )
        .then((r) => {
          setPlaceState({
            place: location.state as PlaceThumbnailData,
            customPlace: r
          })
        })
        .catch((e) => console.error(e))
    }
  }, [location.state])

  return (
    <Row justify="center">
      <Col {...Column}>
        <Container>
          <Provider value={{ ...placeState }}>
            <Header />
            {placeState.customPlace && <Reviews reviews={[]} />}
          </Provider>
        </Container>
      </Col>
    </Row>
  )
}

export default withRouter(SearchDetail)
