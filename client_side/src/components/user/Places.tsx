import { Button, Col, Image, notification, Row, Skeleton } from 'antd'
import { SecondaryText, Title } from 'components/common/typography'
import UserContext, { PlaceList } from 'context/User'
import styled from 'styled-components'
import Divider from './Divider'
import { usePlaceList } from './hooks/user-hooks'
import HeartOutlined from '@ant-design/icons/HeartOutlined'
import { Link } from 'react-router-dom'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useContext, useEffect, useState } from 'react'
import { deletePlaceLists } from 'api/user'

interface PlacesListsContainerProps {
  places: Array<PlaceList>
  catchDelete: Function
}

interface PlacesListsItemProps {
  place: PlaceList
  catchDelete: Function
}

const StyledCol = styled(Col)`
  margin-bottom: 1rem;

  & .ant-skeleton-element {
    display: block;
    width: 100%;
  }
`

const StyledImageWrapper = styled.div`
  position: relative;
`

const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 20;
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

const PlacesListsItem: React.FC<PlacesListsItemProps> = ({
  place,
  catchDelete
}) => {
  const { user, isLoggedIn } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isLoggedIn || !user) {
      return
    }

    setLoading(true)

    try {
      await deletePlaceLists(place.id, user.id as number)
      catchDelete(place.id)
    } catch (error) {
      notification.error({
        message: '삭제 실패',
        placement: 'topLeft'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      setLoading(false)
    }
  })

  return (
    <Col xs={24} sm={12} lg={8}>
      <Link to={`/map?x=${place.x}&y=${place.y}`}>
        <StyledImageWrapper>
          <StyledButtonWrapper>
            <Button
              type="default"
              shape="circle"
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              loading={loading}
            />
          </StyledButtonWrapper>
          <Image
            src={place.photos[0]}
            preview={false}
            style={{ height: '100%' }}
            wrapperStyle={{
              height: '150px',
              overflow: 'hidden',
              borderRadius: '7px'
            }}
          />
        </StyledImageWrapper>
        <div
          className="text-line"
          style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
        >
          <Title level={5}>{place.name}</Title>
          <SecondaryText>{place.address}</SecondaryText>
        </div>
      </Link>
    </Col>
  )
}

const PlacesLists: React.FC<PlacesListsContainerProps> = ({
  places,
  catchDelete
}) => {
  return (
    <PlacesListsRow>
      {places.map((place) => (
        <PlacesListsItem
          key={place.id}
          place={place}
          catchDelete={catchDelete}
        />
      ))}
    </PlacesListsRow>
  )
}

const Places: React.FC = () => {
  const [loading, placeList, setPlaceList] = usePlaceList()

  const catchDelete = (placeId: number | string) => {
    setPlaceList((state: PlaceList[]) =>
      state.filter((place) => place.id !== placeId)
    )
  }

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
        <PlacesLists places={placeList} catchDelete={catchDelete} />
      ) : (
        <SecondaryText>장소 정보가 없습니다.</SecondaryText>
      )}
    </Divider>
  )
}

export default Places
