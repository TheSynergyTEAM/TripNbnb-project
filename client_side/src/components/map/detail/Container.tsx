import { Space } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { FullLoading } from './common/Loading'
import { useFetchPlaceData } from './hooks/FetchPlace'
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
  const [placeData, setPlaceData] = useState<any>(null)
  useFetchPlaceData(setPlaceData)

  return (
    <StyledDetailWrapper direction="vertical">
      {placeData ? (
        <>
          <Thumbnails thumbnails={placeData.place_img} />
          <Intro />
          <Photos images={placeData.place_img} />
          <Reviews reviews={placeData.all_reviews} />
        </>
      ) : (
        <FullLoading />
      )}
    </StyledDetailWrapper>
  )
}

export default Container
