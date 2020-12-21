import { Carousel, Space, Image } from 'antd'
import { Title } from 'components/common/typography/Title'
import Marker from 'context/Marker'
import { useContext } from 'react'
import styled from 'styled-components'

const StyledDetailWrapper = styled(Space)`
  background-color: white;
  height: 100%;
  width: 350px;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 64px;
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
  const { detailItem } = useContext(Marker)

  return (
    <StyledDetailWrapper direction="vertical">
      <ImageWrapper />
      <div>
        <Title>{detailItem?.place_name}</Title>
      </div>
    </StyledDetailWrapper>
  )
}

export default Container
