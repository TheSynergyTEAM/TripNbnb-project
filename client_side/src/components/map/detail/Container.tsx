import { Space } from 'antd'
import styled from 'styled-components'
import { FullLoading } from './common/Loading'
import { useFetchPlaceData } from 'components/map/hooks/FetchPlace'
import Intro from './Intro'
import Photos from './Photos'
import Reviews from './Reviews'
import Thumbnails from './Thumbnails'
import { PlaceDataProvider } from 'context/PlaceDataHandler'
import { useContext } from 'react'
import MarkerContext from 'context/Marker'
import Reservation from './reservation/Container'

const StyledDetailWrapper = styled(Space)`
  background-color: white;
  height: calc(100% - 65px);
  width: 350px;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 63px;
  z-index: 150;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Container: React.FC<any> = () => {
  const [placeData, reviews, setReveiws, images] = useFetchPlaceData()
  const { detailItem } = useContext(MarkerContext)

  const updateCallback = (receivedPlaceData: any) => {
    setReveiws(receivedPlaceData)
  }

  return (
    <StyledDetailWrapper direction="vertical">
      {placeData && detailItem ? (
        <PlaceDataProvider updateCallback={updateCallback}>
          {images.length ? (
            <Thumbnails thumbnails={images.slice(0, 5)} />
          ) : null}
          <Intro />
          {detailItem?.category_group_code === 'AD5' && <Reservation />}
          {images.length >= 5 && <Photos images={images.slice(5)} />}
          <Reviews reviews={reviews} place={detailItem} />
        </PlaceDataProvider>
      ) : (
        <FullLoading />
      )}
    </StyledDetailWrapper>
  )
}

export default Container
