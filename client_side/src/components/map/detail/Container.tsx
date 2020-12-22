import { Carousel, Space, Image } from 'antd'
import MarkerContext from 'context/Marker'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Intro from './Intro'

const StyledDetailWrapper = styled(Space)`
  background-color: white;
  height: 100%;
  width: 350px;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 65px;
  z-index: 150;
`

const ImageWrapper = () => {
  return (
    <Carousel
      effect="fade"
      autoplay
      style={{ height: '200px', width: '350px' }}
    >
      {[1, 2, 3, 4, 5].map((item, index, _) => (
        <Image
          placeholder={<Image src="https://via.placeholder.com/350x200" />}
          preview={false}
          key={index}
          src={'https://picsum.photos/350/200?random=' + index}
        />
      ))}
    </Carousel>
  )
}

const Container: React.FC<any> = () => {
  const { detailItem } = useContext(MarkerContext)

  useEffect(() => {
    if (detailItem !== null) {
      console.log(detailItem)
    }
  }, [detailItem])

  return (
    <StyledDetailWrapper direction="vertical">
      <ImageWrapper />
      <Intro />
    </StyledDetailWrapper>
  )
}

export default Container
