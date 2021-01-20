import { Button, Col, Image, Row, Skeleton } from 'antd'
import { SecondaryText, Title } from 'components/common/typography'
import { PlaceList } from 'context/User'
import styled from 'styled-components'
import Divider from './Divider'
import { usePlaceList } from './hooks/user-hooks'
import HeartOutlined from '@ant-design/icons/HeartOutlined'

interface PlacesListsContainerProps {
  places: Array<PlaceList>
}

interface PlacesListsItemProps {
  place: PlaceList
}

const StyledCol = styled(Col)`
  margin-bottom: 1rem;

  & .ant-skeleton-element {
    display: block;
    width: 100%;
  }
`

const LoadingLists = () => {
  return (
    <Row wrap gutter={10}>
      {new Array(6).fill(0).map((q, i, _) => (
        <StyledCol sm={12} md={8} lg={6} key={i}>
          <Skeleton.Input
            style={{ height: '150px', borderRadius: '10px' }}
            active
          />
          <Skeleton.Input
            style={{ height: '20px', borderRadius: '10px', marginTop: '10px' }}
            active
          />
          <Skeleton.Input
            style={{
              width: '70%',
              height: '20px',
              borderRadius: '10px',
              marginTop: '10px'
            }}
            active
          />
        </StyledCol>
      ))}
    </Row>
  )
}

const PlacesListsRow: React.FC = ({ children }) => {
  return (
    <Row wrap gutter={10}>
      {children}
    </Row>
  )
}

const PlacesListsItem: React.FC<PlacesListsItemProps> = ({ place }) => {
  return (
    <Col sm={12} md={8} xl={6}>
      <Image
        src={place.photos[0]}
        fallback="."
        preview={false}
        style={{ height: '100%' }}
        wrapperStyle={{
          height: '150px',
          overflow: 'hidden',
          borderRadius: '7px'
        }}
      />
      <div
        className="text-line"
        style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
      >
        <Title level={5}>{place.name}</Title>
        <SecondaryText>{place.address}</SecondaryText>
      </div>
    </Col>
  )
}

const PlacesLists: React.FC<PlacesListsContainerProps> = ({ places }) => {
  return (
    <PlacesListsRow>
      {places.map((place) => (
        <PlacesListsItem key={place.id} place={place} />
      ))}
    </PlacesListsRow>
  )
}

const Places: React.FC = () => {
  const [loading, placeList] = usePlaceList()

  return (
    <Divider
      title={
        <Button
          type="ghost"
          shape="circle"
          size="large"
          icon={<HeartOutlined />}
        />
      }
    >
      {loading ? (
        <LoadingLists />
      ) : placeList.length ? (
        <PlacesLists places={placeList} />
      ) : (
        <div>데이터 없음</div>
      )}
    </Divider>
  )
}

export default Places
