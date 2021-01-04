import { Space } from 'antd'
import styled from 'styled-components'
import { FullLoading } from './common/Loading'
import { useFetchPlaceData } from 'components/map/hooks/FetchPlace'
import Intro from './Intro'
import Photos from './Photos'
import Reviews from './Reviews'
import Thumbnails from './Thumbnails'

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
  const placeData = useFetchPlaceData()

  return (
    <StyledDetailWrapper direction="vertical">
      {placeData ? (
        <>
          {placeData.images.length ? (
            <Thumbnails thumbnails={placeData.images.slice(0, 5)} />
          ) : null}
          <Intro />
          {placeData.images.length >= 5 && (
            <Photos images={placeData.images.slice(5)} />
          )}
          <Reviews reviews={placeData.data} />
        </>
      ) : (
        <FullLoading />
      )}
    </StyledDetailWrapper>
  )
}

export default Container
