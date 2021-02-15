import { Row, Col, Skeleton } from 'antd'
import Reviews from 'components/map/detail/Reviews'
import {
  PlaceThumbnailData,
  PlaceData,
  fetchPlaceDataById,
  ReviewData,
  addMetaReviews
} from 'components/map/hooks/FetchPlace'
import { Column } from 'components/search/Bar'
import Header from 'components/search/detail/Header'
import SearchDetailContext from 'context/SearchDetail'
import { useEffect, useState } from 'react'
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom'
import PlaceDataHandler from 'context/PlaceDataHandler'
import styled from 'styled-components'

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

const SkeletonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const { Provider } = SearchDetailContext

const Loading: React.FC = () => {
  const skeletons = [
    {
      style: {
        width: '15rem'
      }
    },
    {
      style: {
        width: '8rem'
      }
    },
    {
      children: {
        style: {
          width: '5rem'
        },
        length: 4
      }
    },
    {
      style: {
        width: '100%',
        height: '15rem',
        borderRadius: '5px'
      }
    },
    {
      style: {
        width: '12rem'
      }
    },
    {
      style: {
        width: '7rem'
      }
    }
  ]

  return (
    <SkeletonWrap>
      {skeletons.map((skeleton, i) =>
        !skeleton.children ? (
          <Skeleton.Input
            active
            key={i}
            style={{ marginBottom: '10px', ...skeleton.style }}
            size="small"
          />
        ) : (
            <div style={{ marginBottom: '10px' }} key={i}>
              {new Array(skeleton.children.length).fill(0).map((i, j) => (
                <Skeleton.Input
                  active
                  key={j}
                  style={{ marginRight: '10px', ...skeleton.children.style }}
                  size="small"
                />
              ))}
            </div>
          )
      )}
    </SkeletonWrap>
  )
}

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

  const updateReview = (reviewData: ReviewData[]) => {
    setPlaceState({
      place: placeState.place,
      customPlace: {
        data: addMetaReviews(reviewData),
        images: (placeState.customPlace?.images) as string[],
        meta: placeState.customPlace?.meta
      }
    })
  }

  return (
    <Row justify="center">
      <Col {...Column}>
        <Container>
          <Provider value={{ ...placeState }}>
            {placeState.customPlace && placeState.place ? (
              <>
                <Header />
                <PlaceDataHandler.Provider value={{ updateCallback: updateReview }}>
                  <Reviews
                    reviews={placeState.customPlace.data}
                    place={placeState.place}
                  />
                </PlaceDataHandler.Provider>
              </>
            ) : (
                <Loading />
              )}
          </Provider>
        </Container>
      </Col>
    </Row>
  )
}

export default withRouter(SearchDetail)
